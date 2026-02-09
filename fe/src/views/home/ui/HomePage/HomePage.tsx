"use client";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { GenreFilters } from "@/features/genre-filter";
import { useFilmDetailModal } from "@/features/film-detail";
import { MovieCard } from "@/entities/movie";
import { useFavorites } from "@/features/favorites";
import { useGenreFilter } from "@/features/genre-filter";
import { useFilmsList } from "../../model/use-films-list";
import styles from "./HomePage.module.css";

export function HomePage() {
  const { allMovies, loading, error } = useFilmsList();
  const { selectedGenres, toggleGenre } = useGenreFilter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { openModal } = useFilmDetailModal();

  const filtered = allMovies.filter((m) => selectedGenres.has(m.genre));
  const moviesWithFavorites = filtered.map((m) => ({
    ...m,
    isFavorite: isFavorite(m.id),
  }));

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.headingRow}>
          <h1 className={styles.title}>Фильмы</h1>
          <GenreFilters
            selectedGenres={selectedGenres}
            onToggle={toggleGenre}
          />
        </div>
        {loading && <p className={styles.status}>Загрузка...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <div className={styles.grid}>
            {moviesWithFavorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onToggleFavorite={toggleFavorite}
                onOpenDetail={openModal}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
