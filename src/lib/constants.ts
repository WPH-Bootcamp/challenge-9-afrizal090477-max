export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';


export const IMAGE_SIZES = {
  poster: {
    small: 'w185',
    medium: 'w342',
    large: 'w500',
    original: 'original',
  },
  backdrop: {
    small: 'w300',
    medium: 'w780',
    large: 'w1280',
    original: 'original',
  },
  profile: {
    small: 'w45',
    medium: 'w185',
    large: 'h632',
    original: 'original',
  },
} as const;


export const getTMDBImageUrl = (path: string | null | undefined, type: keyof typeof IMAGE_SIZES, size: 'small' | 'medium' | 'large' | 'original' = 'medium') => {
  if (!path) {
    if (type === 'poster') return 'https://placehold.co/500x750?text=No+Poster';
    if (type === 'backdrop') return 'https://placehold.co/1920x1080?text=No+Background';
    return 'https://placehold.co/185x278?text=No+Image';
  }
  
  const sizeValue = IMAGE_SIZES[type][size as keyof (typeof IMAGE_SIZES)[typeof type]];
  return `${TMDB_IMAGE_BASE_URL}/${sizeValue}${path}`;
};

export const API_ENDPOINTS = {
  movies: {
    popular: '/movie/popular',
    nowPlaying: '/movie/now_playing',
    details: (id: string | number) => `/movie/${id}`,
    search: '/search/movie',
  },
} as const;

export const STORAGE_KEYS = {
  favorites: 'movie-favorites',
  watchlist: 'movie-watchlist',
} as const;

export const QUERY_KEYS = {
  movies: {
    popular: (page: number) => ['movies', 'popular', page] as const,
    nowPlaying: (page: number) => ['movies', 'now-playing', page] as const,
    details: (id: string | number) => ['movie', id] as const,
    search: (query: string, page: number) => ['movies', 'search', query, page] as const,
  },
} as const;


export const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Paling Populer' },
  { value: 'vote_average.desc', label: 'Rating Tertinggi' },
  { value: 'primary_release_date.desc', label: 'Rilis Terbaru' },
] as const;