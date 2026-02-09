"use client";

import { GENRE_IDS, GENRE_LABELS } from "@/shared/config";
import { CheckIcon, CrossIcon } from "@/shared/ui/icons";
import type { GenreId } from "@/shared/config";
import styles from "./GenreFilters.module.css";

const STYLE_BY_GENRE: Record<GenreId, string> = {
  action: styles.action,
  thriller: styles.thriller,
  comedy: styles.comedy,
  drama: styles.drama,
};

const GENRES = GENRE_IDS.map((id) => ({
  id,
  label: GENRE_LABELS[id],
  style: STYLE_BY_GENRE[id],
}));

export type GenreFiltersProps = {
  selectedGenres: Set<string>;
  onToggle: (genreId: string) => void;
};

export function GenreFilters({ selectedGenres, onToggle }: GenreFiltersProps) {
  const isActive = (id: string) => selectedGenres.has(id);

  return (
    <div className={styles.wrapper}>
      {GENRES.map(({ id, label, style }) => (
        <button
          key={id}
          type="button"
          className={`${styles.pill} ${style} ${isActive(id) ? styles.pillActive : ""}`}
          onClick={() => onToggle(id)}
        >
          <span className={`${styles.icon} ${isActive(id) ? "" : styles.iconInactive}`}>
            {isActive(id) ? <CheckIcon /> : <CrossIcon />}
          </span>
          {label}
        </button>
      ))}
    </div>
  );
}
