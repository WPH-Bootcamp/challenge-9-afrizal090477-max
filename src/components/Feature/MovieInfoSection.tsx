import { useState } from 'react';
import { Calendar, Play, Heart, Star, Video, SquareUser } from 'lucide-react';
import { getImageUrl, formatDate } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import type { MovieDetail } from '@/types/movie';
import { Button } from '@/components/ui/button';

interface MovieInfoSectionProps {
  movie: MovieDetail;
  favoriteActive: boolean;
  onToggleFavorite: () => void;
}

export default function MovieInfoSection({ movie, favoriteActive, onToggleFavorite }: MovieInfoSectionProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  
  const mainGenre = movie.genres?.[0]?.name || 'Action';
  const trailerVideo = movie.videos?.results?.find((v) => v.type === 'Trailer' && v.site === 'YouTube');

  
  const getAgeLimit = (): string => {
    if (movie.adult) return '21+';

    const genreNames = movie.genres?.map((g) => g.name.toLowerCase()) || [];
    if (genreNames.some((name) => ['horror', 'thriller', 'crime'].includes(name))) {
      return '21+';
    }
    if (genreNames.some((name) => ['animation', 'family'].includes(name))) {
      return '13+'; 
    }
    return '13+';
  };

  const ageLimit = getAgeLimit();

  return (
    <div className="w-full max-w-[361px] md:max-w-[1160px] h-auto md:h-[384px] flex flex-col md:flex-row gap-6 md:gap-8 items-start mx-auto md:mx-0">
      <div className="w-[260px] h-[384px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shrink-0 hidden md:block">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* REPLIKA POSTER + JUDUL (KHUSUS MOBILE VERSION) */}
      <div className="flex flex-row items-start gap-4 w-full md:hidden">
        <div className="w-[116px] h-[171px] rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl shrink-0">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 pt-1.5 w-full min-w-0">
          <h1 className="text-xl font-bold tracking-tight text-[#FDFDFD] font-display leading-tight line-clamp-2">
            {movie.title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-[#A4A7AE] font-normal font-body mt-0.5">
            <Calendar className="w-3.5 h-3.5 text-[#FDFDFD] shrink-0" />
            <span className="truncate">{formatDate(movie.release_date)}</span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-[868px] h-auto md:h-full flex flex-col gap-6 md:justify-between pt-0 md:pt-1">
        
        {/* GRUP JUDUL DAN TANGGAL (HANYA MUNCUL DI DESKTOP AGAR TIDAK DUPLIKAT DENGAN MOBILE) */}
        <div className="hidden md:flex flex-col gap-2">
          <h1 className="text-xl md:text-[40px] lg:text-[48px] font-bold tracking-tight md:tracking-[-2%] text-[#FDFDFD] font-display leading-tight">
            {movie.title}
          </h1>
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#A4A7AE] font-normal font-body h-auto md:h-[30px]">
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#FDFDFD]" />
            <span>{formatDate(movie.release_date)}</span>
          </div>
        </div>

        {/* BARIS TOMBOL AKSI (Watch Trailer & Favorite) */}
        <div className="flex items-center gap-4 h-11 md:h-[52px]">
          {trailerVideo ? (
            <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
              <DialogTrigger asChild>
                <Button variant="redFigma" className="w-[301px] md:w-[220px] h-11 md:h-[52px] font-semibold text-sm rounded-full gap-3 cursor-pointer">
                  <span>Watch Trailer</span>
                  <div className="w-5 h-5 md:w-[28px] md:h-[28px] rounded-full bg-white flex items-center justify-center shrink-0">
                    <Play className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 fill-[#B91C1C] text-[#B91C1C] ml-[1.5px] md:ml-[2px]" />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-black border-none aspect-video">
                {isTrailerOpen && (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                    title={movie.title}
                    allowFullScreen
                  />
                )}
              </DialogContent>
            </Dialog>
          ) : (
            <Button disabled variant="secondary" className="w-[200px] md:w-[220px] h-11 md:h-[52px] text-zinc-500 font-semibold text-sm rounded-full gap-3">
              <span>Trailer Unavailable</span>
              <Play className="w-4 h-4 fill-zinc-600 text-zinc-600" />
            </Button>
          )}

          <button
            onClick={onToggleFavorite}
            className="w-11 md:w-[52px] h-11 md:h-[52px] rounded-full border border-[#181D27] bg-[#0A0D1299] backdrop-blur-[40px] flex items-center justify-center text-sm transition-all active:scale-95 cursor-pointer shrink-0"
          >
            <Heart className={`w-5 h-5 ${favoriteActive ? 'fill-[#961200] stroke-[#961200] text-[#961200]' : 'text-[#FDFDFD]'}`} />
          </button>
        </div>

        <div className="grid grid-cols-3 md:flex md:flex-row gap-3 md:gap-5 w-full">
          {[
            { 
              label: 'Rating', 
              value: `${movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}/10`,
              icon: <Star className="w-5 h-5 md:w-6 md:h-6 text-[#E4A802] fill-[#E4A802]" />
            },
            { 
              label: 'Genre', 
              value: mainGenre,
              icon: <Video className="w-5 h-5 md:w-6 md:h-6 text-[#E4E4E5]" />
            },
            { 
              label: 'Age Limit', 
              value: ageLimit,
              icon: <SquareUser className="w-5 h-5 md:w-6 md:h-6 text-[#E4E4E5]" /> 
            }
          ].map((box, i) => (
            <div 
              key={i} 
              className="w-full md:w-[276px] h-[110px] md:h-[146px] bg-[#0A0D1299] border border-[#181D27] p-3 md:p-6 rounded-2xl flex flex-col justify-center items-center gap-1 md:gap-1.5 text-center min-w-0"
            >
              {box.icon}
              <span className="text-[11px] md:text-sm font-normal text-[#D5D7DA] font-body truncate w-full">{box.label}</span>
              <span className="text-sm md:text-xl font-semibold text-[#FDFDFD] font-body truncate w-full px-0.5">{box.value}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}