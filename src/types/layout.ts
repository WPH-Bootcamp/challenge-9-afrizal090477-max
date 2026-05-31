// 1. SATUKAN IMPOR TYPES MOVIE DALAM SATU BARIS RELATIF YANG BERSIH
import { type Movie, type MovieDetail } from './movie';

export interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

/* ─── PROPS KHUSUS UNTUK HERO SECTION ─── */
export interface HeroSectionProps {
  movie: MovieDetail;
}

/* ─── PROPS KHUSUS UNTUK KARTU FILM TRENDING ─── */
export interface MovieCardProps {
  movie: Movie;
  index?: number; // Diperlukan untuk merender nomor peringkat (1, 2, 3...) 
}