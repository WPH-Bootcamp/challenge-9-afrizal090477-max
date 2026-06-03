import MovieCard from './MovieCard'; 
import type { Movie } from '@/types/movie';


interface MovieGridProps {
  movies: Movie[] | undefined;
}

export default function MovieGrid({ movies }: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
        <p className="text-zinc-400 text-sm">Tidak ada film yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}