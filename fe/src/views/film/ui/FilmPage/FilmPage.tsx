"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { useFilmById } from "../../model/use-film-by-id";
import { GENRE_LABELS } from "@/shared/config";
import type { Movie } from "@/shared/types";
import styles from "./FilmPage.module.css";

function BackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function ImagePlaceholderIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="2.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  const pathD =
    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";
  if (filled) {
    return (
      <svg viewBox="2 2 20 18" fill="currentColor">
        <path d={pathD} />
      </svg>
    );
  }
  return (
    <svg viewBox="2 2 20 18" fill="none" stroke="currentColor" strokeWidth="2">
      <path d={pathD} />
    </svg>
  );
}

export function FilmPage() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : null;
  const { film, loading, error, toggleFavorite } = useFilmById(id);
  const [imageError, setImageError] = useState(false);

  if (!id) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <p className={styles.err}>Не указан id фильма.</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Link href="/" className={styles.back}>
            <BackIcon /> Назад к списку
          </Link>
          <p className={styles.status}>Загрузка...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>
          <Link href="/" className={styles.back}>
            <BackIcon /> Назад к списку
          </Link>
          <p className={styles.err}>{error ?? "Фильм не найден."}</p>
        </main>
        <Footer />
      </div>
    );
  }

  const genreClass =
    styles[`genre${film.genre.charAt(0).toUpperCase()}${film.genre.slice(1)}`] ?? styles.genreDrama;

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <Link href="/" className={styles.back}>
          <BackIcon /> Назад к списку
        </Link>
        <div className={styles.content}>
          <div className={styles.posterWrap}>
            {!imageError && film.poster ? (
              <Image
                className={styles.poster}
                src={film.poster}
                alt={film.title}
                width={360}
                height={540}
                unoptimized
                onError={() => setImageError(true)}
              />
            ) : (
              <div className={styles.posterFallback}>
                <ImagePlaceholderIcon />
                <span>Нет изображения</span>
              </div>
            )}
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>{film.title}</h1>
            <div className={styles.details}>
              <span className={`${styles.genreTag} ${genreClass}`}>
                {GENRE_LABELS[film.genre]}
              </span>
              <span className={styles.duration}>
                <ClockIcon />
                {film.durationMinutes} мин.
              </span>
              <button
                type="button"
                onClick={() => toggleFavorite(film.id)}
                className={`${styles.favoriteBtn} ${film.isFavorite ? styles.filled : ""}`}
                aria-label={film.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
              >
                <StarIcon filled={film.isFavorite} />
                {film.isFavorite ? "В избранном" : "В избранное"}
              </button>
            </div>
            {film.description?.trim() ? (
              <section className={styles.descriptionSection} aria-labelledby="film-description-heading">
                <h2 id="film-description-heading" className={styles.descriptionHeading}>Описание</h2>
                <p className={styles.description}>{film.description}</p>
              </section>
            ) : (
              <p className={styles.descriptionEmpty}>Нет описания</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
