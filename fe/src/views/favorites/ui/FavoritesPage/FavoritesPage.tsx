"use client";

import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { GenreFilters } from "@/features/genre-filter";
import { useFilmDetailModal } from "@/features/film-detail";
import { MovieCard } from "@/entities/movie";
import { useGenreFilter } from "@/features/genre-filter";
import { useFavoritesList } from "../../model/use-favorites-list";
import styles from "./FavoritesPage.module.css";

export function FavoritesPage() {
  const { selectedGenres, toggleGenre } = useGenreFilter();
  const { favoritesList, allMovies, favoriteIds, loading, error, toggleFavorite } = useFavoritesList();
  const { openModal } = useFilmDetailModal();

  const filtered = favoritesList.filter((m) => selectedGenres.has(m.genre));

  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className={styles.headingRow}>
          <h1 className={styles.title}>Избранное</h1>
          <GenreFilters selectedGenres={selectedGenres} onToggle={toggleGenre} />
        </div>
        {loading && <p className={styles.status}>Загрузка...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className={styles.status}>
            {allMovies.some((m) => favoriteIds.has(m.id))
              ? "Нет избранных фильмов выбранных жанров."
              : "В избранном пока ничего нет. Добавьте фильмы на главной странице."}
          </p>
        )}
        {!loading && !error && filtered.length > 0 && (
          <div className={styles.grid}>
            {filtered.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onToggleFavorite={toggleFavorite} onOpenDetail={openModal} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
