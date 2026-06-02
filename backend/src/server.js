const crypto = require("crypto");
require("dotenv").config({ quiet: true });
const http = require("http");
const { learningPaths } = require("../data/learning-content");
const {
  createUser,
  findUserByEmail,
  findUserById,
  getLeaderboardUsers,
  healthCheck,
  insertPointEvent,
  insertModuleCompletion,
  insertPurchase,
  insertQuizAttempt,
  saveUser,
} = require("./db");

const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7;
const TOKEN_SECRET = process.env.JWT_SECRET || process.env.FINLIT_TOKEN_SECRET || "finlit-dev-secret";

const storeItems = [
  {
    id: "streak-freeze",
    name: "Pertahankan Streak",
    description: "Pertahankan streak Anda meskipun melewatkan satu hari.",
    price: 500,
  },
  {
    id: "badge-slot",
    name: "Slot Lencana Profil",
    description: "Buka slot tambahan untuk memamerkan pencapaian.",
    price: 1200,
  },
  {
    id: "point-shield",
    name: "Perisai Pelindung",
    description: "Lindungi poin Anda dari penurunan peringkat selama 48 jam.",
    price: 750,
  },
  {
    id: "point-booster",
    name: "Pengganda FinPoin",
    description: "Dapatkan 2x FinPoin untuk 3 modul berikutnya.",
    price: 1000,
  },
];

function nowIso() {
  return new Date().toISOString();
}

function send(res, status, payload, headers = {}) {
  res.statusCode = status;
  for (const [key, value] of Object.entries({
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  })) {
    res.setHeader(key, value);
  }
  res.end(JSON.stringify(payload));
}

function sendError(res, status, message, details) {
  send(res, status, { error: { message, details } });
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request body terlalu besar."));
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Body harus berupa JSON valid."));
      }
    });
    req.on("error", reject);
  });
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function signToken(user) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
    })
  );
  const signature = crypto.createHmac("sha256", TOKEN_SECRET).update(`${header}.${payload}`).digest("base64url");

  return `${header}.${payload}.${signature}`;
}

function verifyToken(token) {
  if (!token || token.split(".").length !== 3) {
    return null;
  }

  const [header, payload, signature] = token.split(".");
  const expected = crypto.createHmac("sha256", TOKEN_SECRET).update(`${header}.${payload}`).digest("base64url");
  if (signature.length !== expected.length) {
    return null;
  }
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  if (data.exp && data.exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return data;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 32, "sha256").toString("hex");
  return { salt, hash };
}

function safeUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    points: user.points || 0,
    dailyStreak: user.dailyStreak || 0,
    progress: user.progress || {},
    badges: user.badges || [],
    inventory: user.inventory || {},
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

async function getAuthUser(req) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const payload = verifyToken(token);
  if (!payload) return null;

  return findUserById(payload.sub);
}

async function requireAuth(req, res) {
  const user = await getAuthUser(req);
  if (!user) {
    sendError(res, 401, "Token tidak valid atau belum login.");
    return null;
  }

  return user;
}

function normalizeAnswer(value) {
  return String(value ?? "")
    .replace(/^[A-D]\.[\s]*/, "")
    .trim();
}

function correctIndex(question) {
  const answer = normalizeAnswer(question.answer);
  if (/^[A-D]$/.test(answer)) {
    return answer.charCodeAt(0) - 65;
  }

  return (question.options || []).findIndex((option) => normalizeAnswer(option) === answer);
}

function answerIndex(answer, question) {
  if (typeof answer === "number" && Number.isInteger(answer)) {
    return answer;
  }

  const value = String(answer ?? "").trim();
  if (/^[A-D]$/i.test(value)) {
    return value.toUpperCase().charCodeAt(0) - 65;
  }

  return (question.options || []).findIndex((option) => normalizeAnswer(option) === normalizeAnswer(value));
}

function getPath(pathId) {
  return learningPaths[pathId] || null;
}

function completionStep(pathData) {
  return (pathData.modules || []).length + 2;
}

function updateActivity(user) {
  const today = new Date().toISOString().slice(0, 10);
  const last = user.lastActivityDate;
  if (last !== today) {
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    user.dailyStreak = last === yesterday ? (user.dailyStreak || 0) + 1 : 1;
    user.lastActivityDate = today;
  }
  user.updatedAt = nowIso();
}

async function awardPoints(user, amount, source, metadata = {}) {
  const points = Number(amount || 0);
  if (!user || points === 0) return;

  user.points = Number(user.points || 0) + points;
  await insertPointEvent({
    id: crypto.randomUUID(),
    userId: user.id,
    amount: points,
    source,
    metadata,
    createdAt: nowIso(),
  });
}

function setProgress(user, pathId, nextProgress) {
  user.progress ||= {};
  user.progress[pathId] = Math.max(Number(user.progress[pathId] || 0), nextProgress);
  return user.progress[pathId];
}

function badgeFor(pathId, percentage) {
  const prefix = pathId === "pinjol" ? "Anti-Pinjol" : "Anti-Scam";
  const certificate = pathId === "pinjol" ? "Anti-Pinjol Ilegal" : "Penipuan Digital";

  if (percentage >= 90) {
    return {
      id: `${pathId}-gold`,
      level: "gold",
      title: `${prefix} Expert`,
      reward: `Badge Gold + Sertifikat ${certificate}`,
      passed: true,
      bonusPoints: 500,
    };
  }
  if (percentage >= 80) {
    return {
      id: `${pathId}-silver`,
      level: "silver",
      title: `${prefix} Champion`,
      reward: "Badge Silver + Poin Bonus 300",
      passed: true,
      bonusPoints: 300,
    };
  }
  if (percentage >= 70) {
    return {
      id: `${pathId}-bronze`,
      level: "bronze",
      title: `${prefix} Aware`,
      reward: pathId === "pinjol" ? "Badge Bronze + Unlock Penipuan Digital" : `Badge Bronze + Sertifikat ${certificate}`,
      passed: true,
      bonusPoints: 150,
    };
  }

  return {
    id: `${pathId}-retry`,
    level: "retry",
    title: "Perlu Belajar Lagi",
    reward: "Ulangi modul yang belum dipahami",
    passed: false,
    bonusPoints: 0,
  };
}

function pathSummary(pathId, user) {
  const pathData = getPath(pathId);
  const progress = Number(user?.progress?.[pathId] || 0);
  const maxProgress = completionStep(pathData);

  return {
    id: pathId,
    title: pathData.title,
    description: pathData.description || "",
    moduleCount: (pathData.modules || []).length,
    quizCount: (pathData.preQuiz?.questions || []).length + (pathData.finalQuiz?.questions || []).length,
    progress,
    maxProgress,
    progressPercent: Math.round(Math.min(100, (progress / maxProgress) * 100)),
    unlocked: true,
  };
}

function serializeModule(moduleData, index, progress) {
  const step = index + 1;
  return {
    id: moduleData.id || `modul-${step}`,
    number: step,
    title: moduleData.title,
    duration: moduleData.duration,
    objectives: moduleData.objectives || [],
    content: moduleData.content || "",
    miniQuiz: moduleData.miniQuiz || [],
    unlocked: progress >= step,
    completed: progress > step,
  };
}

function serializeQuiz(pathId, type, includeAnswers = false) {
  const pathData = getPath(pathId);
  const quiz = type === "final" ? pathData.finalQuiz : pathData.preQuiz;

  return {
    pathId,
    type: type === "final" ? "final" : "pre",
    title: quiz?.title || (type === "final" ? "Quiz Akhir" : "Pre-Quiz Diagnostik"),
    description: quiz?.description || "",
    duration: quiz?.duration || "",
    questions: (quiz?.questions || []).map((question, index) => {
      const payload = {
        id: question.id || `${type}-${index + 1}`,
        number: index + 1,
        question: question.question,
        options: (question.options || []).map(normalizeAnswer),
      };

      if (includeAnswers) {
        payload.correctIndex = correctIndex(question);
        payload.answer = question.answer;
        payload.explanation = question.explanation;
      }

      return payload;
    }),
  };
}

async function route(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.CORS_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const segments = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);

  try {
    if (req.method === "GET" && segments.length === 0) {
      send(res, 200, {
        name: "FINLIT Backend API",
        version: "1.0.0",
        docs: "/api/docs",
        health: "/api/health",
      });
      return;
    }

    if (req.method === "GET" && segments[0] === "docs") {
      send(res, 200, {
        endpoints: [
          "POST /api/auth/register",
          "POST /api/auth/login",
          "GET /api/auth/me",
          "GET /api/stats",
          "GET /api/paths",
          "GET /api/paths/:pathId",
          "GET /api/paths/:pathId/modules",
          "GET /api/paths/:pathId/modules/:moduleId",
          "POST /api/paths/:pathId/modules/:moduleId/complete",
          "GET /api/quiz?pathId=pinjol&type=pre",
          "POST /api/quiz/submit",
          "GET /api/profile",
          "PATCH /api/profile",
          "GET /api/store/items",
          "POST /api/store/purchase",
          "GET /api/leaderboard",
        ],
      });
      return;
    }

    if (req.method === "GET" && segments[0] === "health") {
      const database = await healthCheck();
      send(res, 200, { ok: true, time: nowIso(), database: { connected: true, time: database.now } });
      return;
    }

    if (req.method === "GET" && segments[0] === "stats") {
      const paths = Object.keys(learningPaths).map((pathId) => learningPaths[pathId]);
      send(res, 200, {
        topics: paths.length,
        modules: paths.reduce((total, item) => total + (item.modules || []).length, 0),
        badges: 16,
        price: "Gratis",
      });
      return;
    }

    if (segments[0] === "auth" && req.method === "POST" && segments[1] === "register") {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const name = String(body.name || body.fullName || "").trim();
      const password = String(body.password || "");

      if (!name || !email || password.length < 8) {
        sendError(res, 400, "Nama, email, dan password minimal 8 karakter wajib diisi.");
        return;
      }
      if (await findUserByEmail(email)) {
        sendError(res, 409, "Alamat email ini sudah terdaftar.");
        return;
      }

      const { salt, hash } = hashPassword(password);
      const user = {
        id: crypto.randomUUID(),
        name,
        email,
        passwordSalt: salt,
        passwordHash: hash,
        points: 0,
        dailyStreak: 0,
        progress: { pinjol: 0, penipuan: 0 },
        badges: [],
        inventory: {},
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      const savedUser = await createUser(user);

      send(res, 201, { user: safeUser(savedUser), token: signToken(savedUser) });
      return;
    }

    if (segments[0] === "auth" && req.method === "POST" && segments[1] === "login") {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const password = String(body.password || "");
      const user = await findUserByEmail(email);

      if (!user) {
        sendError(res, 401, "Email atau password salah.");
        return;
      }

      const { hash } = hashPassword(password, user.passwordSalt);
      if (hash !== user.passwordHash) {
        sendError(res, 401, "Email atau password salah.");
        return;
      }

      send(res, 200, { user: safeUser(user), token: signToken(user) });
      return;
    }

    if (segments[0] === "auth" && req.method === "GET" && segments[1] === "me") {
      const user = await requireAuth(req, res);
      if (!user) return;

      send(res, 200, { user: safeUser(user) });
      return;
    }

    if (segments[0] === "auth" && req.method === "POST" && segments[1] === "logout") {
      send(res, 200, { ok: true });
      return;
    }

    if (segments[0] === "profile" && req.method === "GET") {
      const user = await requireAuth(req, res);
      if (!user) return;

      send(res, 200, { user: safeUser(user) });
      return;
    }

    if (segments[0] === "profile" && req.method === "PATCH") {
      const user = await requireAuth(req, res);
      if (!user) return;

      const body = await parseBody(req);
      if (body.name) user.name = String(body.name).trim();
      user.updatedAt = nowIso();
      const savedUser = await saveUser(user);

      send(res, 200, { user: safeUser(savedUser) });
      return;
    }

    if (segments[0] === "progress" && req.method === "GET") {
      const user = await requireAuth(req, res);
      if (!user) return;

      send(res, 200, { progress: user.progress || {} });
      return;
    }

    if (segments[0] === "progress" && req.method === "PATCH") {
      const user = await requireAuth(req, res);
      if (!user) return;

      const body = await parseBody(req);
      const pathId = String(body.pathId || "");
      const pathData = getPath(pathId);
      if (!pathData) {
        sendError(res, 404, "Learning path tidak ditemukan.");
        return;
      }

      const progress = Math.min(completionStep(pathData), Math.max(0, Number(body.progress || 0)));
      setProgress(user, pathId, progress);
      user.updatedAt = nowIso();
      const savedUser = await saveUser(user);

      send(res, 200, { progress: savedUser.progress });
      return;
    }

    if (segments[0] === "paths" && req.method === "GET" && segments.length === 1) {
      const user = await getAuthUser(req);
      send(res, 200, { paths: Object.keys(learningPaths).map((pathId) => pathSummary(pathId, user)) });
      return;
    }

    if (segments[0] === "paths" && req.method === "GET" && segments.length === 2) {
      const pathId = segments[1];
      const pathData = getPath(pathId);
      if (!pathData) {
        sendError(res, 404, "Learning path tidak ditemukan.");
        return;
      }

      const user = await getAuthUser(req);
      const progress = Number(user?.progress?.[pathId] || 0);
      send(res, 200, {
        ...pathSummary(pathId, user),
        preQuiz: serializeQuiz(pathId, "pre"),
        finalQuiz: serializeQuiz(pathId, "final"),
        modules: (pathData.modules || []).map((moduleData, index) => serializeModule(moduleData, index, progress)),
      });
      return;
    }

    if (segments[0] === "paths" && segments[2] === "modules" && req.method === "GET" && segments.length === 3) {
      const pathId = segments[1];
      const pathData = getPath(pathId);
      if (!pathData) {
        sendError(res, 404, "Learning path tidak ditemukan.");
        return;
      }

      const user = await getAuthUser(req);
      const progress = Number(user?.progress?.[pathId] || 0);
      send(res, 200, {
        modules: (pathData.modules || []).map((moduleData, index) => serializeModule(moduleData, index, progress)),
      });
      return;
    }

    if (segments[0] === "paths" && segments[2] === "modules" && req.method === "GET") {
      const pathId = segments[1];
      const moduleNumber = Number(segments[3]);
      const pathData = getPath(pathId);
      const moduleData = pathData?.modules?.[moduleNumber - 1];
      if (!pathData || !moduleData) {
        sendError(res, 404, "Modul tidak ditemukan.");
        return;
      }

      const user = await getAuthUser(req);
      const progress = Number(user?.progress?.[pathId] || 0);
      send(res, 200, { module: serializeModule(moduleData, moduleNumber - 1, progress) });
      return;
    }

    if (segments[0] === "paths" && segments[2] === "modules" && req.method === "POST" && segments[4] === "complete") {
      const user = await requireAuth(req, res);
      if (!user) return;

      const pathId = segments[1];
      const moduleNumber = Number(segments[3]);
      const pathData = getPath(pathId);
      const moduleData = pathData?.modules?.[moduleNumber - 1];
      if (!pathData || !moduleData) {
        sendError(res, 404, "Modul tidak ditemukan.");
        return;
      }
      if (Number(user.progress?.[pathId] || 0) < moduleNumber) {
        sendError(
          res,
          403,
          moduleNumber === 1
            ? "Selesaikan pre-quiz terlebih dahulu untuk membuka Modul 1."
            : `Selesaikan Modul ${moduleNumber - 1} terlebih dahulu untuk membuka Modul ${moduleNumber}.`
        );
        return;
      }
      const body = await parseBody(req);
      const moduleAlreadyCompleted = Number(user.progress?.[pathId] || 0) > moduleNumber;
      if (!moduleAlreadyCompleted && (moduleData.miniQuiz || []).length > 0 && body.miniQuizCompleted !== true) {
        sendError(res, 400, "Selesaikan mini quiz modul terlebih dahulu sebelum menandai modul selesai.");
        return;
      }

      const progress = setProgress(user, pathId, moduleNumber + 1);
      if (!moduleAlreadyCompleted) {
        await awardPoints(user, 50, "module_complete", { pathId, moduleNumber });
      }
      updateActivity(user);
      const savedUser = await saveUser(user);
      if (!moduleAlreadyCompleted) {
        await insertModuleCompletion({
          id: crypto.randomUUID(),
          userId: user.id,
          pathId,
          moduleNumber,
          completedAt: nowIso(),
        });
      }

      send(res, 200, { progress, points: savedUser.points, user: safeUser(savedUser) });
      return;
    }

    if (segments[0] === "quiz" && req.method === "GET") {
      const pathId = url.searchParams.get("pathId") || "pinjol";
      const type = url.searchParams.get("type") === "final" ? "final" : "pre";
      const includeAnswers = url.searchParams.get("includeAnswers") === "true";
      if (!getPath(pathId)) {
        sendError(res, 404, "Quiz tidak ditemukan.");
        return;
      }

      send(res, 200, { quiz: serializeQuiz(pathId, type, includeAnswers) });
      return;
    }

    if (segments[0] === "quiz" && req.method === "POST" && segments[1] === "submit") {
      const body = await parseBody(req);
      const pathId = String(body.pathId || "pinjol");
      const type = body.type === "final" ? "final" : "pre";
      const pathData = getPath(pathId);
      const quiz = type === "final" ? pathData?.finalQuiz : pathData?.preQuiz;

      if (!pathData || !quiz) {
        sendError(res, 404, "Quiz tidak ditemukan.");
        return;
      }

      const answers = Array.isArray(body.answers) ? body.answers : [];
      const results = (quiz.questions || []).map((question, index) => {
        const selectedIndex = answerIndex(answers[index], question);
        const expectedIndex = correctIndex(question);
        return {
          questionId: question.id || `${type}-${index + 1}`,
          selectedIndex,
          correctIndex: expectedIndex,
          correct: selectedIndex === expectedIndex,
          explanation: question.explanation,
        };
      });
      const score = results.filter((item) => item.correct).length;
      const total = results.length;
      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      const badge = type === "final" ? badgeFor(pathId, percentage) : null;
      const user = await getAuthUser(req);

      if (type === "final" && user && Number(user.progress?.[pathId] || 0) < completionStep(pathData) - 1) {
        sendError(res, 403, "Selesaikan semua modul terlebih dahulu untuk membuka quiz akhir.");
        return;
      }

      if (user) {
        await awardPoints(user, score * (type === "final" ? 20 : 10), "quiz_score", { pathId, type, score, total });
        if (type === "pre") {
          setProgress(user, pathId, 1);
        }
        if (type === "final" && badge?.passed) {
          setProgress(user, pathId, completionStep(pathData));
          user.badges ||= [];
          if (!user.badges.some((item) => item.id === badge.id)) {
            await awardPoints(user, badge.bonusPoints, "badge_bonus", { pathId, badgeId: badge.id, percentage });
            user.badges.push({ ...badge, earnedAt: nowIso() });
          }
        }
        updateActivity(user);
      }

      const attempt = {
        id: crypto.randomUUID(),
        userId: user?.id || null,
        pathId,
        type,
        score,
        total,
        percentage,
        results,
        createdAt: nowIso(),
      };
      let savedUser = user;
      if (user) {
        savedUser = await saveUser(user);
      }
      await insertQuizAttempt(attempt);

      send(res, 200, {
        score,
        total,
        percentage,
        passed: type === "final" ? Boolean(badge?.passed) : true,
        badge,
        results,
        user: safeUser(savedUser),
      });
      return;
    }

    if (segments[0] === "store" && req.method === "GET" && segments[1] === "items") {
      send(res, 200, { items: storeItems });
      return;
    }

    if (segments[0] === "store" && req.method === "POST" && segments[1] === "purchase") {
      const user = await requireAuth(req, res);
      if (!user) return;

      const body = await parseBody(req);
      const item = storeItems.find((candidate) => candidate.id === body.itemId);
      if (!item) {
        sendError(res, 404, "Item toko tidak ditemukan.");
        return;
      }
      if (Number(user.points || 0) < item.price) {
        sendError(res, 400, "Saldo FinPoin tidak cukup.");
        return;
      }

      user.points -= item.price;
      user.inventory ||= {};
      user.inventory[item.id] = Number(user.inventory[item.id] || 0) + 1;
      user.updatedAt = nowIso();
      const purchase = {
        id: crypto.randomUUID(),
        userId: user.id,
        itemId: item.id,
        price: item.price,
        createdAt: nowIso(),
      };
      const savedUser = await saveUser(user);
      await insertPurchase(purchase);

      send(res, 201, { purchase, user: safeUser(savedUser) });
      return;
    }

    if (segments[0] === "sync" && req.method === "POST") {
      const user = await requireAuth(req, res);
      if (!user) return;

      const body = await parseBody(req);
      const localPoints = Math.max(0, Number(body.points || 0));
      const localProgress = body.progress || {};

      const pointsToAdd = Math.max(0, localPoints - Number(user.points || 0));
      if (pointsToAdd > 0) {
        await awardPoints(user, pointsToAdd, "local_sync", { source: "localStorage" });
      }

      for (const [pathId, rawProgress] of Object.entries(localProgress)) {
        const pathData = getPath(pathId);
        if (pathData) {
          setProgress(user, pathId, Math.max(0, Number(rawProgress || 0)));
        }
      }

      updateActivity(user);
      const savedUser = await saveUser(user);
      send(res, 200, { user: safeUser(savedUser) });
      return;
    }

    if (segments[0] === "leaderboard" && req.method === "GET") {
      const user = await getAuthUser(req);
      const period = url.searchParams.get("period") === "allTime" ? "allTime" : "weekly";
      const limit = Math.max(1, Math.min(100, Number(url.searchParams.get("limit") || 100)));
      const entries = (await getLeaderboardUsers(period))
        .sort((a, b) => b.points - a.points)
        .map((item, index) => ({ rank: index + 1, ...item }));

      send(res, 200, {
        period,
        top: entries.slice(0, limit),
        me: user ? entries.find((entry) => entry.userId === user.id) : null,
      });
      return;
    }

    sendError(res, 404, "Endpoint tidak ditemukan.");
  } catch (error) {
    sendError(res, error.message.includes("JSON") ? 400 : 500, error.message);
  }
}

module.exports = route;

if (require.main === module) {
  const port = Number(process.env.PORT || 4000);
  http.createServer(route).listen(port, () => {
    console.log(`FINLIT backend running at http://localhost:${port}/api`);
  });
}
