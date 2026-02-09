"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAddFilmModal } from "@/features/add-film";

export default function AddFilmRedirect() {
  const router = useRouter();
  const { openModal } = useAddFilmModal();

  useEffect(() => {
    openModal();
    router.replace("/");
  }, [openModal, router]);

  return null;
}
