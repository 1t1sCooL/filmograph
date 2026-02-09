import type { MovieGenre } from "../types";

export const GENRE_IDS: readonly MovieGenre[] = ["action", "thriller", "comedy", "drama"];
export type GenreId = MovieGenre;

export const GENRE_LABELS: Record<MovieGenre, string> = {
  action: "Боевик",
  thriller: "Триллер",
  comedy: "Комедия",
  drama: "Драма",
};
