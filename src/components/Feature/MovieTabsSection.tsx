import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CastCard from './CastCard';
import MovieCard from './MovieCard';
import type { MovieDetail, Cast, Movie } from '@/types/movie';

interface MovieTabsSectionProps {
  movie: MovieDetail;
  topCast: Cast[];
  similarMovies: Movie[];
}

export default function MovieTabsSection({ movie, topCast, similarMovies }: MovieTabsSectionProps) {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-[1160px] mt-8">
      <TabsList className="bg-transparent border-b border-zinc-900 rounded-none w-full justify-start p-0 h-auto gap-8 mb-8">
        <TabsTrigger 
          value="overview" 
          className="bg-transparent p-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 text-sm font-bold text-zinc-400 data-[state=active]:text-white transition-all"
        >
          Overview & Cast
        </TabsTrigger>
        <TabsTrigger 
          value="similar" 
          className="bg-transparent p-0 pb-3 rounded-none border-b-2 border-transparent data-[state=active]:border-red-600 text-sm font-bold text-zinc-400 data-[state=active]:text-white transition-all"
        >
          Similar Movies
        </TabsTrigger>
      </TabsList>

      {/* OVERVIEW & CAST */}
      <TabsContent value="overview" className="flex flex-col gap-10 focus-visible:outline-none animate-in fade-in duration-300">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-xl font-bold tracking-[-2%] text-[#FDFDFD] font-display">Overview</h2>
          <p className="text-sm text-[#A4A7AE] font-normal font-body leading-relaxed max-w-[1160px]">
            {movie.overview || 'Sinopsis cerita belum tersedia untuk katalog judul film ini.'}
          </p>
        </div>

        <div className="w-full flex flex-col gap-6">
          <h2 className="text-xl font-bold tracking-[-2%] text-[#FDFDFD] font-display">Cast & Crew</h2>
          {/* Grid responsif untuk cast */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 w-full">
            {topCast.length > 0 ? (
              topCast.map((cast) => <CastCard key={cast.id} cast={cast} />)
            ) : (
              <p className="text-zinc-600 text-sm italic">Cast information unavailable.</p>
            )}
          </div>
        </div>
      </TabsContent>

      {/* SIMILAR MOVIES */}
      <TabsContent value="similar" className="focus-visible:outline-none animate-in fade-in duration-300">
        <div className="flex flex-col gap-6 w-full">
          {similarMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8 w-full">
              {similarMovies.map((similarMovie) => (
                <MovieCard key={similarMovie.id} movie={similarMovie} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-10 text-zinc-600">No similar movies found.</div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}