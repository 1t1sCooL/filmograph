"use client";

import { usePathname } from "next/navigation";
import { useAddFilmModal } from "@/features/add-film";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { href: "/", label: "Все фильмы" },
  { href: "/favorites", label: "Избранное" },
] as const;

export function Header() {
  const pathname = usePathname();
  const { openModal } = useAddFilmModal();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.links}>
          {NAV_LINKS.map(({ href, label }) => {
            const path = pathname ?? "";
            const isActive = href === "/" ? path === "/" : path === href || path.startsWith(href + "/");
            return (
              <a key={href} href={href} className={`${styles.link} ${isActive ? styles.linkActive : ""}`}>
                {label}
              </a>
            );
          })}
          <button type="button" onClick={openModal} className={styles.link}>
            Добавить фильм
          </button>
        </div>
      </nav>
    </header>
  );
}
