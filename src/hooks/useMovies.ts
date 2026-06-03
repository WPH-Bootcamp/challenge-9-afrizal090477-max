import { useQuery, useInfiniteQuery, keepPreviousData } from '@tanstack/react-query';
import { movieService } from '@/services/movieService';
import type { MovieResponse, MovieDetail } from '@/types/movie';


const GLOBAL_STALE_TIME = 1000 * 60 * 5;

export const usePopularMovies = (page = 1) => {
  return useQuery<MovieResponse>({
    queryKey: ['movies', 'popular', page],
    queryFn: () => movieService.getPopularMovies(page),
    staleTime: GLOBAL_STALE_TIME,
    placeholderData: keepPreviousData,
  });
};


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


export const useNowPlayingMovies = (page = 1) => {
  return useQuery<MovieResponse>({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => movieService.getNowPlayingMovies(page),
    staleTime: GLOBAL_STALE_TIME,
    placeholderData: keepPreviousData,
  });
};


export const useMovieDetail = (id: string | number | undefined) => {
  return useQuery<MovieDetail>({
    queryKey: ['movies', 'detail', id],
    queryFn: () => movieService.getMovieDetails(id!),
    enabled: !!id,
    staleTime: GLOBAL_STALE_TIME,
  });
};


export const useSearchMovies = (query: string, page = 1) => {
  const trimmedQuery = query.trim();
  return useQuery<MovieResponse>({
    queryKey: ['movies', 'search', trimmedQuery, page],
    queryFn: () => movieService.searchMovies(trimmedQuery, page),
    enabled: trimmedQuery.length >= 2, 
    staleTime: 1000 * 60 * 1, 
    placeholderData: keepPreviousData,
  });
};