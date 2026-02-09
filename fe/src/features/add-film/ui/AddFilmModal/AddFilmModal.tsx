"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { GENRE_LABELS } from "@/shared/config";
import type { Movie } from "@/shared/types";
import { useUserFilms } from "@/features/user-films";
import { useAddFilmModal } from "../../model/add-film-modal-context";
import styles from "./AddFilmModal.module.css";

const GENRE_OPTIONS: { value: Movie["genre"]; label: string }[] = (
  ["action", "thriller", "comedy", "drama"] as const
).map((value) => ({ value, label: GENRE_LABELS[value] }));

function CloseIcon() {
  return (
    <svg className={styles.closeIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function AddFilmModal() {
  const { isOpen, closeModal } = useAddFilmModal();
  const { addFilm } = useUserFilms();
  const [title, setTitle] = useState("");
  const [poster, setPoster] = useState("");
  const [genre, setGenre] = useState<Movie["genre"]>("drama");
  const [durationMinutes, setDurationMinutes] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const titleTrim = title.trim();
    const posterTrim = poster.trim();
    if (!titleTrim) {
      setError("Введите название фильма");
      return;
    }
    if (!posterTrim) {
      setError("Введите ссылку на картинку");
      return;
    }
    const duration = Math.floor(Number(durationMinutes) || 0);
    if (duration <= 0) {
      setError("Введите продолжительность в минутах (число больше 0)");
      return;
    }
    addFilm({ title: titleTrim, poster: posterTrim, genre, durationMinutes: duration, description: description.trim() || undefined });
    setTitle("");
    setPoster("");
    setDurationMinutes("");
    setDescription("");
    setGenre("drama");
    closeModal();
  };

  if (!isOpen) return null;

  const modal = (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-film-title"
    >
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={closeModal} aria-label="Закрыть">
          <CloseIcon />
        </button>
        <h2 id="add-film-title" className={styles.heading}>
          Добавить фильм
        </h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <p className={styles.error}>{error}</p>}
          <label className={styles.label}>
            Название
            <input type="text" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название фильма" />
          </label>
          <label className={styles.label}>
            Ссылка на картинку
            <input type="url" className={styles.input} value={poster} onChange={(e) => setPoster(e.target.value)} placeholder="https://..." />
          </label>
          <label className={styles.label}>
            Жанр
            <select className={styles.select} value={genre} onChange={(e) => setGenre(e.target.value as Movie["genre"])}>
              {GENRE_OPTIONS.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            Продолжительность (мин)
            <input type="number" min={1} className={styles.input} value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)} placeholder="90" />
          </label>
          <label className={styles.label}>
            Описание
            <textarea className={styles.textarea} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Краткое описание сюжета" rows={4} />
          </label>
          <button type="submit" className={styles.submit}>Добавить фильм</button>
        </form>
      </div>
    </div>
  );

  return typeof document !== "undefined" ? createPortal(modal, document.body) : null;
}
