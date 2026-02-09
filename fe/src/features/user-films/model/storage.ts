import type { Movie } from "@/shared/types";
import { USER_FILMS_STORAGE_KEY } from "./constants";

function isMovie(f: unknown): f is Movie {
  return (
    typeof f === "object" &&
    f !== null &&
    "id" in f &&
    "title" in f &&
    "poster" in f &&
    "genre" in f &&
    "durationMinutes" in f &&
    "isFavorite" in f
  );
}

export function loadUserFilms(): Movie[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(USER_FILMS_STORAGE_KEY);
    if (!raw) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(isMovie);
  } catch {
    return [];
  }
}

export function saveUserFilms(films: Movie[]): void {
  try {
    localStorage.setItem(USER_FILMS_STORAGE_KEY, JSON.stringify(films));
  } catch {
    // ignore
  }
}
