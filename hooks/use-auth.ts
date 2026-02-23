"use client";

import { useMemo } from "react";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";

// Types صريحة لعودة الهُوك
export type UseAuthResult = {
  user: Session["user"] | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export function useAuth(): UseAuthResult {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";

  const value = useMemo<UseAuthResult>(() => {
    return {
      user: session?.user ?? null,
      isLoading,
      isAuthenticated: !!session?.user,
    };
  }, [session, isLoading]);

  return value;
}
