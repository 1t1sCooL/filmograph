export type ApiGenre = "боевик" | "триллер" | "комедия" | "драма";

export type FilmFromApi = {
  id: number;
  name: string;
  description?: string | null;
  image: string;
  film_type?: ApiGenre;
  duration?: number;
};
