"use client";

import { createContext, useCallback, useContext, useState } from "react";

export type AddFilmModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const AddFilmModalContext = createContext<AddFilmModalContextValue | null>(null);

export function AddFilmModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <AddFilmModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </AddFilmModalContext.Provider>
  );
}

export function useAddFilmModal(): AddFilmModalContextValue {
  const ctx = useContext(AddFilmModalContext);
  if (!ctx) throw new Error("useAddFilmModal must be used within AddFilmModalProvider");
  return ctx;
}
