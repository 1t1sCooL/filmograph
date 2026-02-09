import type { Movie } from "@/shared/types";

export type UserFilmInput = {
  title: string;
  poster: string;
  genre: Movie["genre"];
  durationMinutes: number;
  description?: string | null;
};

export type UserFilmsContextValue = {
  userFilms: Movie[];
  addFilm: (input: UserFilmInput) => void;
};
