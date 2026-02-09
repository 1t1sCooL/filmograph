"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type FilmDetailModalContextValue = {
  filmId: string | null;
  isOpen: boolean;
  openModal: (filmId: string) => void;
  closeModal: () => void;
};

const FilmDetailModalContext = createContext<FilmDetailModalContextValue | null>(null);

export function FilmDetailModalProvider({ children }: { children: React.ReactNode }) {
  const [filmId, setFilmId] = useState<string | null>(null);
  const isOpen = filmId !== null;
  const openModal = useCallback((id: string) => setFilmId(id), []);
  const closeModal = useCallback(() => setFilmId(null), []);

  return (
    <FilmDetailModalContext.Provider value={{ filmId, isOpen, openModal, closeModal }}>
      {children}
    </FilmDetailModalContext.Provider>
  );
}

export function useFilmDetailModal(): FilmDetailModalContextValue {
  const ctx = useContext(FilmDetailModalContext);
  if (!ctx) throw new Error("useFilmDetailModal must be used within FilmDetailModalProvider");
  return ctx;
}
