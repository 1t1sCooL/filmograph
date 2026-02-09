import type { FilmFromApi } from "@/shared/types";
import type { Movie } from "@/shared/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const GENRE_MAP: Record<string, Movie["genre"]> = {
  боевик: "action",
  триллер: "thriller",
  комедия: "comedy",
  драма: "drama",
  криминал: "thriller",
};

function parseGenre(film: FilmFromApi): Movie["genre"] {
  const raw =
    film.film_type ??
    (typeof film.description === "string"
      ? film.description.trim().toLowerCase()
      : null);
  if (raw && raw in GENRE_MAP) return GENRE_MAP[raw] as Movie["genre"];
  return "drama";
}

export function getMockFilms(): Movie[] {
  const filmsFromBackend = [
    {
      name: "Матрица",
      description:
        "Хакер Нео узнает, что реальность — это симуляция, и становится последней надеждой человечества в войне против машин.",
      image: "1.png",
      film_type: "боевик",
      duration: 136,
    },
    {
      name: "Безумный Макс",
      description:
        "В постапокалиптической пустоши Макс объединяется с воительницей Фуриосой, чтобы сбежать от деспотичного тирана.",
      image: "2.png",
      film_type: "боевик",
      duration: 88,
    },
    {
      name: "Джентельмены",
      description:
        "Талантливый выпускник Оксфорда разработал схему обогащения, но при попытке продать бизнес сталкивается с жестким сопротивлением.",
      image: "3.png",
      film_type: "триллер",
      duration: 113,
    },
    {
      name: "Отступники",
      description:
        "Полицейский под прикрытием в мафии и «крот» внутри полиции пытаются вычислить друг друга, пока их жизни висят на волоске.",
      image: "4.png",
      film_type: "триллер",
      duration: 151,
    },
    {
      name: "Гладиатор",
      description:
        "Преданный римский генерал Максимус проходит путь от раба до гладиатора, чтобы отомстить за смерть семьи и своего императора.",
      image: "5.png",
      film_type: "боевик",
      duration: 155,
    },
    {
      name: "Однажды в Голивуде",
      description:
        "История заходящей звезды вестернов и его бессменного дублера, разворачивающаяся в Лос-Анджелесе 1969 года.",
      image: "6.png",
      film_type: "драма",
      duration: 161,
    },
    {
      name: "Предложение",
      description:
        "Влиятельному редактору грозит депортация, и она заставляет своего ассистента притвориться её женихом.",
      image: "7.png",
      film_type: "комедия",
      duration: 108,
    },
    {
      name: "Малышка на миллион",
      description:
        "Официантка Мэгги стремится пробиться в мир профессионального бокса под руководством ворчливого тренера.",
      image: "8.png",
      film_type: "драма",
      duration: 132,
    },
    {
      name: "Ларри Краун",
      description:
        "Потеряв работу из-за отсутствия образования, Ларри идет в колледж, где обретает новых друзей и новую любовь.",
      image: "9.png",
      film_type: "комедия",
      duration: 98,
    },
  ] as const;
  const genreMap: Record<string, Movie["genre"]> = {
    боевик: "action",
    триллер: "thriller",
    комедия: "comedy",
    драма: "drama",
    криминал: "thriller",
  };
  return filmsFromBackend.map((film, index) => ({
    id: `mock-${index + 1}`,
    title: film.name,
    poster: `${BASE_PATH}/images/${film.image}`,
    genre: genreMap[film.film_type.toLowerCase()] ?? "drama",
    durationMinutes: film.duration,
    isFavorite: false,
    description: film.description ?? null,
  }));
}

export async function fetchFilms(): Promise<Movie[]> {
  try {
    const res = await fetch(`${API_BASE}/films/`);
    if (!res.ok) throw new Error(`Ошибка загрузки фильмов: ${res.status}`);
    const data: FilmFromApi[] = await res.json();
    return data.map((film) => ({
      id: String(film.id),
      title: film.name,
      poster: film.image.startsWith("http") ? film.image : film.image.startsWith("/") ? `${BASE_PATH}${film.image}` : `${BASE_PATH}/images/${film.image}`,
      genre: parseGenre(film),
      durationMinutes: film.duration ?? 0,
      isFavorite: false,
      description: film.description ?? null,
    }));
  } catch {
    return getMockFilms();
  }
}
