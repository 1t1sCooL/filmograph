"use client";

import { useEffect, useState } from "react";
import type { Movie } from "@/shared/types";
import { fetchFilms } from "@/shared/api";
import { useUserFilms } from "@/features/user-films";

export function useFilmsList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userFilms } = useUserFilms();

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) {
        setLoading(true);
        setError(null);
      }
    });
    fetchFilms()
      .then((data) => {
        if (!cancelled) setMovies(data);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allMovies = [...movies, ...userFilms];
  return { allMovies, loading, error };
}
