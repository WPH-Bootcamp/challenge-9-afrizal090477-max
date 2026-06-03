import { type Movie, type MovieDetail } from './movie';

export interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export interface HeroSectionProps {
  movie: MovieDetail;
}

export interface MovieCardProps {
  movie: Movie;
  index?: number; // Diperlukan untuk merender nomor peringkat (1, 2, 3...) 
}