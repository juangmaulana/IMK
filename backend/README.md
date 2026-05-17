# FINLIT Backend

Backend ini dibuat sebagai Node.js API murni untuk fitur yang sudah ada di folder `frontend`, tanpa TanStack, dan memakai PostgreSQL sebagai database.

## Jalankan Lokal

Siapkan PostgreSQL terlebih dahulu, lalu buat database:

```bash
createdb finlit
```

Buat file `.env` dari contoh:

```bash
cp .env.example .env
```

Isi minimal:

```text
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/finlit
JWT_SECRET=isi-secret-yang-panjang
CORS_ORIGIN=http://localhost:3000
```

Install dependency dan jalankan server:

```bash
cd backend
npm install
npm run dev
```

API berjalan di:

```text
http://localhost:4000/api
```

Gunakan `PORT=4100 npm run dev` jika ingin port lain.

Tabel PostgreSQL akan dibuat otomatis saat API pertama kali mengakses database. Schema lengkap juga tersedia di `schema.sql` kalau ingin menjalankannya manual.

## Deploy ke Vercel

Deploy folder `backend` sebagai project Vercel, lalu sambungkan database PostgreSQL seperti Vercel Postgres, Neon, Supabase, Railway, atau provider PostgreSQL lain.

```bash
cd backend
vercel
```

Untuk production, tambahkan environment variable:

```text
DATABASE_URL=postgresql://...
JWT_SECRET=isi-secret-yang-panjang
CORS_ORIGIN=https://domain-frontend-anda.vercel.app
```

Jika provider database membutuhkan SSL, backend ini otomatis mengaktifkan SSL untuk koneksi non-localhost. Untuk PostgreSQL lokal tanpa SSL, gunakan host `localhost` atau set `PGSSLMODE=disable`.

## Database

Tabel yang dipakai:

```text
users
quiz_attempts
module_completions
purchases
```

Data konten pembelajaran tetap berupa seed statis di `data/learning-content.js`, sedangkan data user, progres, poin, badge, attempt quiz, completion modul, inventory, dan purchase disimpan di PostgreSQL.

## Endpoint Utama

Semua response berbentuk JSON.

```text
GET    /api/health
GET    /api/docs
GET    /api/stats

POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
GET    /api/auth/me

GET    /api/profile
PATCH  /api/profile

GET    /api/paths
GET    /api/paths/:pathId
GET    /api/paths/:pathId/modules
GET    /api/paths/:pathId/modules/:moduleId
POST   /api/paths/:pathId/modules/:moduleId/complete

GET    /api/quiz?pathId=pinjol&type=pre
GET    /api/quiz?pathId=pinjol&type=final
POST   /api/quiz/submit

GET    /api/store/items
POST   /api/store/purchase

GET    /api/leaderboard
```

## Contoh Request

Register:

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Nama Pengguna","email":"user@mail.com","password":"password123"}'
```

Login:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@mail.com","password":"password123"}'
```

Submit quiz:

```bash
curl -X POST http://localhost:4000/api/quiz/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_ANDA" \
  -d '{"pathId":"pinjol","type":"pre","answers":[1,2,2,2,1]}'
```

Tandai modul selesai:

```bash
curl -X POST http://localhost:4000/api/paths/pinjol/modules/1/complete \
  -H "Authorization: Bearer TOKEN_ANDA"
```

## Path ID

```text
pinjol
penipuan
```
