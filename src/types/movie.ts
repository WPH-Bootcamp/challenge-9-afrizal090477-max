export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
  original_title: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Cast {
  id: number;
  cast_id: number;
  credit_id: string;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface Crew {
  id: number;
  credit_id: string;
  name: string;
  department: string;
  job: string;
  profile_path: string | null;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string; // ID Video YouTube (Contoh: d9MyW72ELq0)
  site: string; // Biasanya "YouTube"
  size: number;
  type: string; // "Trailer" | "Teaser" | "Clip"
  official: boolean;
  published_at: string;
}

// Interface gabungan lengkap untuk Movie Detail Page
export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[];
  budget: number;
  revenue: number;
  runtime: number | null;
  status: string;
  tagline: string | null;
  credits?: {
    cast: Cast[];
    crew: Crew[];
  };
  videos?: {
    results: Video[];
  };
  similar?: {
    results: Movie[];
  };
  
  /*  FITUR TAMBAHAN UNTUK FIGMA HERO BANNER */
  backdropPath?: string;  
  trailerUrl?: string;    
}