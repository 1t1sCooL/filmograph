"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { GENRE_LABELS } from "@/shared/config";
import type { Movie } from "@/shared/types";
import { useFilmDetailModal } from "../../model/film-detail-modal-context";
import { useFilmById } from "../../model/use-film-by-id";
import styles from "./FilmDetailModal.module.css";

function CloseIcon() {
  return (
    <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
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

export function FilmDetailModal() {
  const { filmId, closeModal, isOpen } = useFilmDetailModal();
  const { film, loading, error, toggleFavorite } = useFilmById(filmId);
  const [imageError, setImageError] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  if (!isOpen) return null;

  const modal = (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="film-detail-title"
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.posterWrap}>
          <button type="button" className={styles.close} onClick={closeModal} aria-label="Закрыть">
            <CloseIcon />
          </button>
          {loading && (
            <div className={styles.posterFallback}>
              <span>Загрузка...</span>
            </div>
          )}
          {!loading && error && (
            <div className={styles.posterFallback}>
              <span className={styles.err}>{error}</span>
            </div>
          )}
          {!loading && !error && film && (
            <>
              {!imageError && film.poster ? (
                <Image
                  className={styles.poster}
                  src={film.poster}
                  alt={film.title}
                  width={560}
                  height={350}
                  unoptimized
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={styles.posterFallback}>
                  <ImagePlaceholderIcon />
                  <span>Нет изображения</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className={styles.body}>
          {loading && <p className={styles.status}>Загрузка...</p>}
          {error && !film && <p className={styles.err}>{error}</p>}
          {film && (
            <>
              <h2 id="film-detail-title" className={styles.title}>{film.title}</h2>
              <div className={styles.details}>
                <span className={`${styles.genreTag} ${styles[`genre${film.genre.charAt(0).toUpperCase()}${film.genre.slice(1)}`] ?? styles.genreDrama}`}>
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
                <>
                  <h3 className={styles.descriptionHeading}>Описание</h3>
                  <p className={styles.description}>{film.description}</p>
                </>
              ) : (
                <p className={styles.descriptionEmpty}>Нет описания</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
