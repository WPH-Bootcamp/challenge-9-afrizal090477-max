import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Movie } from '@/types/movie';

interface MovieStore {
  favorites: Movie[];
  watchlist: Movie[];

  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;

  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  toggleWatchlist: (movie: Movie) => void;
  isWatchlist: (movieId: number) => boolean;
}

export const useMovieStore = create<MovieStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      watchlist: [],

      addFavorite: (movie) =>
        set((state) => ({
          favorites: state.favorites.some((m) => m.id === movie.id)
            ? state.favorites
            : [...state.favorites, movie],
        })),

      removeFavorite: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((m) => m.id !== movieId),
        })),

      toggleFavorite: (movie) => {
        const { isFavorite, removeFavorite, addFavorite } = get();
        if (isFavorite(movie.id)) {
          removeFavorite(movie.id);
        } else {
          addFavorite(movie);
        }
      },

      isFavorite: (movieId) => {
        return get().favorites.some((m) => m.id === movieId);
      },

      addToWatchlist: (movie) =>
        set((state) => ({
          watchlist: state.watchlist.some((m) => m.id === movie.id)
            ? state.watchlist
            : [...state.watchlist, movie],
        })),

      removeFromWatchlist: (movieId) =>
        set((state) => ({
          watchlist: state.watchlist.filter((m) => m.id !== movieId),
        })),

      toggleWatchlist: (movie) => {
        const { isWatchlist, removeFromWatchlist, addToWatchlist } = get();
        if (isWatchlist(movie.id)) {
          removeFromWatchlist(movie.id);
        } else {
          addToWatchlist(movie);
        }
      },

      isWatchlist: (movieId) => {
        return get().watchlist.some((m) => m.id === movieId);
      },
    }),
    {
      name: 'movie-explorer-app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);