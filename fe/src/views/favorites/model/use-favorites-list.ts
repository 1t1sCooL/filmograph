"use client";

import { useEffect, useState } from "react";
import type { Movie } from "@/shared/types";
import { fetchFilms } from "@/shared/api";
import { useFavorites } from "@/features/favorites";
import { useUserFilms } from "@/features/user-films";

export function useFavoritesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { favoriteIds, toggleFavorite } = useFavorites();
  const { userFilms } = useUserFilms();

  useEffect(() => {
    let cancelled = false;
    fetchFilms()
      .then((data) => {
        if (!cancelled) setMovies(data);
      })
      .catch((e) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Ошибка загрузки");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allMovies = [...movies, ...userFilms];
  const favoritesList = allMovies
    .filter((m) => favoriteIds.has(m.id))
    .map((m) => ({ ...m, isFavorite: true }));

  return {
    favoritesList,
    allMovies,
    favoriteIds,
    loading,
    error,
    toggleFavorite,
  };
}
