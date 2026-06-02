import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import type { MovieResponse, MovieDetail } from '@/types/movie';

// Konfigurasi global cache agar tidak boros hit API (5 Menit)
const GLOBAL_STALE_TIME = 1000 * 60 * 5;

// 1. Hook untuk mengambil film terpopuler (Paginated)
export const usePopularMovies = (page = 1) => {
  return useQuery<MovieResponse>({
    queryKey: ['movies', 'popular', page],
    queryFn: () => movieService.getPopularMovies(page),
    staleTime: GLOBAL_STALE_TIME,
    placeholderData: keepPreviousData,
  });
};

// 2. Hook untuk Infinite Scroll / Load More pada film yang sedang tayang
export const useInfiniteNowPlayingMovies = () => {
  return useInfiniteQuery<MovieResponse>({
    queryKey: ['movies', 'now-playing', 'infinite'],
    queryFn: ({ pageParam = 1 }) => movieService.getNowPlayingMovies(pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    staleTime: GLOBAL_STALE_TIME,
    placeholderData: keepPreviousData,
  });
};

// 3. Hook konvensional untuk film yang sedang tayang (Paginated)
export const useNowPlayingMovies = (page = 1) => {
  return useQuery<MovieResponse>({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => movieService.getNowPlayingMovies(page),
    staleTime: GLOBAL_STALE_TIME,
    placeholderData: keepPreviousData,
  });
};

// 4. Hook untuk mengambil detail film berdasarkan ID
export const useMovieDetail = (id: string | number | undefined) => {
  return useQuery<MovieDetail>({
    queryKey: ['movies', 'detail', id],
    queryFn: () => movieService.getMovieDetails(id!),
    enabled: !!id, // API hanya akan di-hit jika ID bernilai true (bukan undefined/kosong)
    staleTime: GLOBAL_STALE_TIME,
  });
};

// 5. Hook untuk pencarian film dengan minimal 2 karakter
export const useSearchMovies = (query: string, page = 1) => {
  const trimmedQuery = query.trim();
  
  return useQuery<MovieResponse>({
    queryKey: ['movies', 'search', trimmedQuery, page],
    queryFn: () => movieService.searchMovies(trimmedQuery, page),
    enabled: trimmedQuery.length >= 2, 
    staleTime: 1000 * 60 * 1, // Untuk search, berikan cache lebih pendek (1 menit) agar dinamis
    placeholderData: keepPreviousData,
  });
};