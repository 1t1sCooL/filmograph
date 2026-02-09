"use client";

import { useEffect, useState } from "react";
import type { Movie } from "@/shared/types";
import { fetchFilms } from "@/shared/api";
import { useUserFilms } from "@/features/user-films";
import { useFavorites } from "@/features/favorites";

export function useFilmById(id: string | null) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userFilms } = useUserFilms();
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    queueMicrotask(() => {
      if (!cancelled) {
        setLoadingState(true);
        setError(null);
      }
    });
    fetchFilms()
      .then((data) => {
        if (!cancelled) setMovies(data);
      })
      .catch((e) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (!cancelled) setLoadingState(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const allMovies = [...movies, ...userFilms];
  const film = id ? (allMovies.find((m) => m.id === id) ?? null) : null;
  const filmWithFavorite = film
    ? { ...film, isFavorite: isFavorite(film.id) }
    : null;

  return {
    film: filmWithFavorite,
    loading: id !== null ? loadingState : false,
    error,
    toggleFavorite,
  };
}
