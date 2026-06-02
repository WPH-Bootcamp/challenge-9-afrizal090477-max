import { useRef, useState, useEffect, useMemo } from 'react'; 
import { useOutletContext } from 'react-router-dom'; 
import { ChevronLeft, ChevronRight } from 'lucide-react'; 
import { usePopularMovies, useInfiniteNowPlayingMovies, useSearchMovies, useMovieDetail } from '@/hooks/useMovies';
import MovieGridSkeleton from '@/components/Feature/MovieGridSkeleton';
import HeroSection from '@/components/Feature/HeroSection';
import MovieCard from '@/components/Feature/MovieCard';
import { Button } from '@/components/ui/button';

export default function Home() {
  const [searchQuery] = useOutletContext<[string, (val: string) => void]>();
  const trendingRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const isSearching = searchQuery.trim().length >= 2;

  // DATA FETCHING 
  const { data: popularData, isLoading: isLoadingPopular, isError: isErrorPopular } = usePopularMovies(1);
  const { 
    data: infiniteData, 
    isLoading: isLoadingNowPlaying, 
    isError: isErrorNowPlaying, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteNowPlayingMovies();
  const { data: searchData, isLoading: isLoadingSearch, isError: isErrorSearch } = useSearchMovies(searchQuery, 1);

  const firstMovieId = popularData?.results?.[0]?.id;

  const { 
    data: heroMovieDetail, 
    isLoading: isLoadingHeroDetail 
  } = useMovieDetail(firstMovieId);

  const trendingMovies = useMemo(() => popularData?.results || [], [popularData?.results]);
  const searchResults = useMemo(() => searchData?.results || [], [searchData?.results]);
  const allNewReleases = useMemo(() => infiniteData?.pages.flatMap((page) => page.results) || [], [infiniteData?.pages]);
  
  const isInitialPage = infiniteData?.pages.length === 1;

  const displayNewReleases = isInitialPage 
    ? allNewReleases.slice(0, 15) 
    : allNewReleases;

  const isLoading = isLoadingPopular || isLoadingHeroDetail || (displayNewReleases.length === 0 && isLoadingNowPlaying) || (isSearching && isLoadingSearch);
  const isError = isErrorPopular || isErrorNowPlaying || (isSearching && isErrorSearch);

  // ─── SCROLL LOGIC ───
  const handleScrollClick = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScrollPosition = () => {
    if (trendingRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trendingRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScrollPosition();
    // Pastikan panah dihitung ulang kalau ukuran layar di-resize
    window.addEventListener('resize', handleScrollPosition);
    return () => window.removeEventListener('resize', handleScrollPosition);
  }, [trendingMovies]);

  if (isLoading) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-10 py-8">
        <MovieGridSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 max-w-md mx-auto space-y-3">
        <div className="text-primary font-bold text-xl">Gagal Mengambil Data TMDB</div>
        <p className="text-zinc-500 text-sm">Periksa koneksi internet atau API key di .env kamu.</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#000000] text-white min-h-screen select-none animate-in fade-in duration-500">
      
      {/* TAMPILAN HASIL PENCARIAN FILM */}
      {isSearching ? (
        <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[140px] pt-[140px] md:pt-[170px] pb-24 space-y-10">
          <div className="flex flex-col gap-2 border-b border-zinc-900 pb-5">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#FDFDFD]">
              Search Results for: <span className="text-zinc-400">"{searchQuery}"</span>
            </h2>
            <p className="text-xs md:text-sm text-zinc-500 font-medium">
              {searchResults.length} {searchResults.length <= 1 ? 'movie' : 'movies'} found
            </p>
          </div>

          {searchResults.length > 0 ? (
            <div className="w-full max-w-[1160px] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[16px] md:gap-x-[20px] md:gap-y-[32px]">
              {searchResults.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="w-full max-w-[1160px] flex flex-col items-center justify-center py-24 text-center gap-4">
              <div className="text-4xl">🎬</div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-[#FDFDFD]">No Movies Found</h3>
                <p className="text-xs md:text-sm text-zinc-500 max-w-xs mx-auto">
                  We couldn't find any match for your criteria. Try typing another title.
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        
        /* TAMPILAN NORMAL MULTI-SECTION (HOME) */
        <div className="space-y-16 pb-20 pt-0">
          {/* Spanduk Hero Utama */}
          {heroMovieDetail && (
            <HeroSection movie={heroMovieDetail} />
          )}

          {/* SECTION TRENDING NOW  */}
          <div className="w-full max-w-[1440px] mx-auto pl-4 md:pl-12 lg:pl-[140px] pr-0 flex flex-col gap-[24px] md:gap-[32px] relative group/section pt-4 md:pt-8">
            
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight text-[#FDFDFD]">
              Trending Now
            </h2>
            
            <div className="relative w-full">
              
              {/* TOMBOL KIRI */}
              {canScrollLeft && (
                <div className="absolute left-[-16px] md:left-[-60px] lg:left-[-60px] top-0 bottom-0 w-[60px] md:w-[120px] bg-gradient-to-r from-[#000000] via-[#000000]/90 to-transparent z-20 pointer-events-none flex items-center justify-start md:justify-center pl-2 md:pl-0 animate-in fade-in duration-300">
                  <button 
                    onClick={() => handleScrollClick(trendingRef, 'left')}
                    className="w-[44px] h-[44px] md:w-12 md:h-12 rounded-full bg-[#0A0D1299] md:bg-[#181D27]/80 backdrop-blur-[31.42px] md:backdrop-blur-md flex items-center justify-center border border-white/5 md:border-white/5 shadow-2xl pointer-events-auto cursor-pointer hover:bg-zinc-800 transition-opacity opacity-100 lg:opacity-0 group-hover/section:opacity-100 -translate-y-6"
                  >
                    <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-[#FDFDFD]" />
                  </button>
                </div>
              )}

              {/* TOMBOL KANAN & BLUR KARTU KE-6 */}
              {canScrollRight && (
                <div className="absolute right-0 top-0 bottom-0 w-[123px] md:w-[140px] bg-gradient-to-l from-[#000000] via-[#000000]/90 to-transparent z-20 pointer-events-none flex items-center justify-end md:justify-center pr-4 md:pr-[40px] animate-in fade-in duration-300">
                  <button 
                    onClick={() => handleScrollClick(trendingRef, 'right')}
                    className="w-[44px] h-[44px] md:w-12 md:h-12 rounded-full bg-[#0A0D1299] md:bg-[#181D27]/80 backdrop-blur-[31.42px] md:backdrop-blur-md flex items-center justify-center border border-white/5 md:border-white/5 shadow-2xl pointer-events-auto cursor-pointer hover:bg-zinc-800 transition-opacity opacity-100 lg:opacity-0 group-hover/section:opacity-100 -translate-y-6"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-[#FDFDFD]" />
                  </button>
                </div>
              )}

              {/* CONTAINER SCROLL */}
              <div 
                ref={trendingRef}
                onScroll={handleScrollPosition}
                className="w-full overflow-x-auto pb-4 scrollbar-none snap-x scroll-smooth"
              >
                
                <div className="flex gap-[16px] md:gap-[20px] w-max pr-[123px] md:pr-[140px]">
                  {trendingMovies.map((movie, index) => (
                    <MovieCard 
                      key={movie.id} 
                      movie={movie} 
                      index={index} 
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* SECTION NEW RELEASE GRID */}
          <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[140px] flex flex-col gap-[24px] md:gap-[32px] relative mt-2">
            <h2 className="text-[24px] md:text-[32px] font-bold tracking-tight text-[#FDFDFD]">
              New Release
            </h2>

            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-[16px] md:gap-x-[20px] gap-y-[24px] md:gap-y-[32px]">
                {displayNewReleases.map((movie) => (
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                  />
                ))}
              </div>
            </div>

            {hasNextPage && (
              <div className="w-full flex justify-center pt-8">
                <Button 
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="px-8 h-[48px] rounded-xl bg-[#0A0D1299] backdrop-blur-[40px] border border-zinc-800 text-sm font-semibold text-[#FDFDFD] hover:bg-zinc-900 shadow-md transition-transform active:scale-95 disabled:opacity-50"
                >
                  {isFetchingNextPage ? 'Loading More Movies...' : 'Load More'}
                </Button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}