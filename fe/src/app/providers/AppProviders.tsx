"use client";

import { FavoritesProvider } from "@/features/favorites";
import { UserFilmsProvider } from "@/features/user-films";
import { AddFilmModalProvider, AddFilmModal } from "@/features/add-film";
import { FilmDetailModalProvider, FilmDetailModal } from "@/features/film-detail";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <FavoritesProvider>
      <UserFilmsProvider>
        <AddFilmModalProvider>
          <FilmDetailModalProvider>
            {children}
            <AddFilmModal />
            <FilmDetailModal />
          </FilmDetailModalProvider>
        </AddFilmModalProvider>
      </UserFilmsProvider>
    </FavoritesProvider>
  );
}
