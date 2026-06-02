import { useState } from 'react';
import { Play } from 'lucide-react'; 
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { type HeroSectionProps } from '../../types/layout';

export default function HeroSection({ movie }: HeroSectionProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : '/placeholder-backdrop.jpg';

  const trailerVideo = movie.videos?.results?.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );

  return (
    <section 
      className="relative w-full max-w-[1440px] h-[392px] sm:h-[650px] lg:h-[810px] mx-auto bg-cover bg-center bg-no-repeat flex items-center overflow-hidden rounded-none"
      style={{
        backgroundImage: `linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%), url(${backdropUrl})`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/50 to-transparent hidden sm:block" />
      <div className="absolute inset-0 bg-black/30 sm:hidden" />

      <div className="absolute top-[180px] sm:top-auto left-4 sm:left-12 lg:pl-[140px] right-4 sm:right-auto z-10 flex flex-col gap-5 sm:gap-[48px] max-w-[775px] select-none animate-in fade-in slide-in-from-bottom-5 duration-700">
        
        {/* WRAPPER TEKS */}
        <div className="flex flex-col gap-[16px] max-w-[635px]">
          <h1 className="text-2xl sm:text-5xl lg:text-[56px] font-bold tracking-[-0.02em] text-[#FDFDFD] font-display leading-tight drop-shadow-md line-clamp-1 sm:line-clamp-none">
            {movie.title}
          </h1>
          <p className="text-sm sm:text-[16px] text-[#A4A7AE] font-normal leading-relaxed drop-shadow line-clamp-2 lg:line-clamp-none">
            {movie.overview}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-3 sm:gap-[16px] w-full sm:w-auto">
          {trailerVideo ? (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-[8px] w-full sm:w-[230px] h-11 sm:h-[52px] bg-[#961200] hover:bg-red-800 text-[#FDFDFD] font-semibold text-sm sm:text-[16px] rounded-full transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0">
                  <span>Watch Trailer</span>
                  <div className="w-[24px] h-[24px] bg-[#FDFDFD] rounded-full flex items-center justify-center shadow-sm shrink-0">
                    <Play className="w-[12px] h-[12px] fill-[#961200] text-[#961200] ml-[2px]" /> 
                  </div>
                </button>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl p-0 bg-black border-zinc-950 aspect-video overflow-hidden rounded-2xl shadow-2xl">
                {isOpen && (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                    title={`${movie.title} Official Trailer`}
                    allowFullScreen
                  />
                )}
              </DialogContent>
            </Dialog>
          ) : (
            <button disabled className="flex items-center justify-center gap-[8px] w-full sm:w-[230px] h-11 sm:h-[52px] bg-zinc-800 text-zinc-500 font-semibold text-sm sm:text-[16px] rounded-full opacity-50 cursor-not-allowed shrink-0">
              <span>Trailer Unavailable</span>
            </button>
          )}
          <button 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex items-center justify-center w-full sm:w-[230px] h-11 sm:h-[52px] bg-[#0A0D1299] backdrop-blur-[40px] hover:bg-zinc-900/60 text-[#FDFDFD] border border-[#181D27] font-semibold text-sm sm:text-[16px] rounded-full transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer shrink-0"
          >
            <span>See Detail</span>
          </button>
          
        </div>

      </div>
    </section>
  );
}