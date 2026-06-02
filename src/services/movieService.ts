import api from '@/lib/axios';
import type { MovieResponse, MovieDetail } from '@/types/movie';

export const movieService = {
  getPopularMovies: async (page = 1): Promise<MovieResponse> => {
    const { data } = await api.get<MovieResponse>('/movie/popular', {
      params: { page },
    });
    return data;
  },

  getNowPlayingMovies: async (page = 1): Promise<MovieResponse> => {
    const { data } = await api.get<MovieResponse>('/movie/now_playing', {
      params: { page },
    });
    return data;
  },


  getMovieDetails: async (movieId: string | number): Promise<MovieDetail> => {
    const { data } = await api.get<MovieDetail>(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,similar',
      },
    });
    return data;
  },

  // Mencari film berdasarkan kata kunci (query)
  searchMovies: async (query: string, page = 1): Promise<MovieResponse> => {
    const trimmedQuery = query.trim();
    
    // Jika query kosong, kembalikan struktur respons kosong bawaan TMDB agar tidak crash
    if (!trimmedQuery) {
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }

    const { data } = await api.get<MovieResponse>('/search/movie', {
      params: { 
        query: trimmedQuery, 
        page 
      },
    });
    return data;
  },
};