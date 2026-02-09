export type MovieGenre = "action" | "thriller" | "comedy" | "drama";

export type Movie = {
  id: string;
  title: string;
  poster: string;
  genre: MovieGenre;
  durationMinutes: number;
  isFavorite: boolean;
  description?: string | null;
};
