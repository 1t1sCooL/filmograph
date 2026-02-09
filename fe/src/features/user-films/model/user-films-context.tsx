"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Movie } from "@/shared/types";
import type { UserFilmInput, UserFilmsContextValue } from "./types";
import { loadUserFilms, saveUserFilms } from "./storage";

const UserFilmsContext = createContext<UserFilmsContextValue | null>(null);

export function UserFilmsProvider({ children }: { children: React.ReactNode }) {
  const [userFilms, setUserFilms] = useState<Movie[]>(() => loadUserFilms());

  const addFilm = useCallback((input: UserFilmInput) => {
    const film: Movie = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: input.title.trim(),
      poster: input.poster.trim(),
      genre: input.genre,
      durationMinutes: Math.max(0, Math.floor(Number(input.durationMinutes) || 0)),
      isFavorite: false,
      description: (input.description ?? "").trim() || null,
    };
    setUserFilms((prev) => {
      const next = [...prev, film];
      saveUserFilms(next);
      return next;
    });
  }, []);

  return (
    <UserFilmsContext.Provider value={{ userFilms, addFilm }}>
      {children}
    </UserFilmsContext.Provider>
  );
}

export function useUserFilms(): UserFilmsContextValue {
  const ctx = useContext(UserFilmsContext);
  if (!ctx) throw new Error("useUserFilms must be used within UserFilmsProvider");
  return ctx;
}

export type { UserFilmInput, UserFilmsContextValue } from "./types";
