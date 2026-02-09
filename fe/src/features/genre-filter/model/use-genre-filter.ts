"use client";

import { useState } from "react";
import { GENRE_IDS } from "@/shared/config";

const INITIAL_GENRES = new Set(GENRE_IDS);

export function useGenreFilter() {
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(INITIAL_GENRES);

  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) => {
      const next = new Set(prev);
      if (next.has(genreId)) next.delete(genreId);
      else next.add(genreId);
      return next;
    });
  };

  return { selectedGenres, toggleGenre };
}
