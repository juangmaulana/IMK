"use client";

import { useEffect, useState } from "react";
import { Landing } from "@/components/Landing";

export default function HomeClient() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setSignedIn(localStorage.getItem("isLoggedIn") === "true");
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return <Landing signedIn={signedIn} />;
}
