"use client";

import { useState } from "react";
import Image from "next/image";
import { GENRE_LABELS } from "@/shared/config";
import type { Movie } from "@/shared/types";
import styles from "./MovieCard.module.css";

const GENRE_CLASS: Record<Movie["genre"], string> = {
  action: styles.genreAction,
  thriller: styles.genreThriller,
  comedy: styles.genreComedy,
  drama: styles.genreDrama,
};

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

export type MovieCardProps = {
  movie: Movie;
  onToggleFavorite?: (id: string) => void;
  onOpenDetail?: (id: string) => void;
};

export function MovieCard({ movie, onToggleFavorite, onOpenDetail }: MovieCardProps) {
  const [imageError, setImageError] = useState(false);
  const genreClass = GENRE_CLASS[movie.genre] ?? styles.genreDrama;

  const handleStarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(movie.id);
  };

  const handleCardClick = () => onOpenDetail?.(movie.id);

  const cardContent = (
    <>
      {imageError ? (
        <div className={styles.posterFallback} aria-hidden>
          <ImagePlaceholderIcon />
          <span>Нет изображения</span>
        </div>
      ) : (
        <Image
          className={styles.poster}
          src={movie.poster}
          alt={movie.title}
          width={300}
          height={450}
          unoptimized
          onError={() => setImageError(true)}
        />
      )}
      <div className={styles.body}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.details}>
          <span className={`${styles.genreTag} ${genreClass}`}>
            {GENRE_LABELS[movie.genre]}
          </span>
          <span className={styles.duration}>
            <ClockIcon />
            {movie.durationMinutes} мин.
          </span>
          {onToggleFavorite ? (
            <button
              type="button"
              onClick={handleStarClick}
              className={`${styles.star} ${styles.starButton} ${movie.isFavorite ? styles.starFilled : ""}`}
              aria-label={movie.isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
            >
              <StarIcon filled={movie.isFavorite} />
            </button>
          ) : (
            <span className={`${styles.star} ${movie.isFavorite ? styles.starFilled : ""}`}>
              <StarIcon filled={movie.isFavorite} />
            </span>
          )}
        </div>
      </div>
    </>
  );

  const wrapperProps = onOpenDetail
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: handleCardClick,
        onKeyDown: (e: React.KeyboardEvent) => e.key === "Enter" && handleCardClick(),
        "aria-label": `Открыть: ${movie.title}`,
      }
    : {};

  return (
    <article className={styles.card}>
      <div className={styles.link} {...wrapperProps}>
        {cardContent}
      </div>
    </article>
  );
}
