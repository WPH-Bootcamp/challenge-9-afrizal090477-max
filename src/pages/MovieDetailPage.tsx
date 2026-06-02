import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovieDetail } from '@/hooks/useMovies'; 
import { useMovieStore } from '@/store/movieStore';
import { getImageUrl } from '@/lib/utils';
import { useToast } from '../hooks/use-toast';
import MovieInfoSection from '@/components/Feature/MovieInfoSection';
import MovieTabsSection from '@/components/Feature/MovieTabsSection';
import type { Movie, Genre, Cast } from '@/types/movie';

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { data: movie, isLoading, isError } = useMovieDetail(id || '');
  const { toggleFavorite, isFavorite } = useMovieStore();
  
  const favoriteActive = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (isLoading) {
    return (
      <div className="w-full bg-black min-h-screen flex items-center justify-center">
        <p className="text-zinc-500 text-sm animate-pulse">Loading detail movie...</p>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="text-center py-20 max-w-md mx-auto text-zinc-50 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-black text-red-500">Gagal Memuat Detail Film</h2>
        <button onClick={() => navigate('/')} className="px-6 py-2.5 bg-zinc-900 rounded-full text-xs font-semibold mt-4">
          ← Kembali ke Beranda
        </button>
      </div>
    );
  }

  const topCast: Cast[] = (movie.credits?.cast?.slice(0, 6) as Cast[]) || [];
  const similarMovies = movie.similar?.results?.slice(0, 5) || [];

  const handleToggleFavorite = () => {
    const movieDataToStore: Movie = {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
      popularity: movie.popularity,
      adult: movie.adult,
      video: movie.video,
      original_language: movie.original_language,
      original_title: movie.original_title,
      genre_ids: movie.genres ? movie.genres.map((g: Genre) => g.id) : [],
    };
    
    toggleFavorite(movieDataToStore);

    toast({
      description: !favoriteActive ? "Success Add to Favorites" : "Removed from Favorites",
      className: "w-[531px] h-[52px] bg-[#00000040] backdrop-blur-[40px] border border-zinc-800 text-[#FDFDFD] rounded-2xl flex items-center px-6 justify-start mx-auto fixed bottom-10 left-1/2 -translate-x-1/2 shadow-2xl z-50",
    });
  };

  return (
    <div className="w-full bg-black text-zinc-50 min-h-screen pb-20 select-none">
      <div className="relative h-[345px] md:h-[55vh] w-full overflow-hidden flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={getImageUrl(movie.backdrop_path, 'original')}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-[140px] -translate-y-[123px] md:-translate-y-24 relative z-10 flex flex-col gap-6 md:gap-12">
        
        <MovieInfoSection 
          movie={movie} 
          favoriteActive={favoriteActive} 
          onToggleFavorite={handleToggleFavorite} 
        />

        <MovieTabsSection 
          movie={movie} 
          topCast={topCast} 
          similarMovies={similarMovies} 
        />
        
      </div>
    </div>
  );
}