"use client";

import { useEffect, useState } from "react";
import { Landing } from "@/components/Landing";

export default function HomeClient() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(localStorage.getItem("hasSignedUp") === "true");
  }, []);

  return <Landing signedIn={signedIn} />;
}