"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import NavbarWithLogin from "./navbar/navbar";

export default function AuthGuard({ children }) {
  const [session, setSession] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    // 🔹 provjeri session na load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // 🔹 slušaj login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // ✅ AKO SE USER LOGOUTA NA REQUEST STRANICI → izbaci ga
      if (!session) {
        router.refresh(); // ili redirect ako želiš
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // ⏳ loading
  if (session === undefined) {
    return null;
  }

  // 🔒 NIJE LOGIN → fullscreen modal BEZ X
  if (!session) {
    return <LoginModal force />;
  }

  // ✅ LOGIN → pokaži stranicu
  return children;
}