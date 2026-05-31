import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieStore } from '@/store/movieStore';
import { Star, Heart, Play, Loader2 } from 'lucide-react';
import { getImageUrl } from '@/lib/utils';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useMovieDetail } from '@/hooks/useMovies';
import type { Movie } from '@/types/movie';
import MovieEmptyImg from '@/assets/movie.png';
import { Button } from '@/components/ui/button';

// ─── KOMPONEN: MENGAMBIL TRAILER HANYA SAAT MODAL DIBUKA (LAZY LOAD) ───
function TrailerFetcher({ movieId, title }: { movieId: number; title: string }) {
  const { data: movieDetail, isLoading } = useMovieDetail(movieId.toString());

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-zinc-400">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
        <p className="font-body text-sm">Loading trailer...</p>
      </div>
    );
  }

  const trailerVideo = movieDetail?.videos?.results?.find(
    (v: { type: string; site: string; key: string }) => v.type === 'Trailer' && v.site === 'YouTube'
  );

  if (!trailerVideo) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-zinc-500">
        <div className="w-16 h-16 rounded-full bg-zinc-900/50 flex items-center justify-center mb-2">
          <Play className="w-6 h-6 text-zinc-600" />
        </div>
        <h3 className="text-white font-bold text-lg">Trailer Unavailable</h3>
        <p className="text-sm">Sorry, there is no official trailer for this movie.</p>
      </div>
    );
  }

  return (
    <iframe
      className="w-full h-full"
      src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
      title={title}
      allowFullScreen
    />
  );
}

interface FavoriteMovieRowProps {
  movie: Movie;
  onRemove: () => void;
}

function FavoriteMovieRow({ movie, onRemove }: FavoriteMovieRowProps) {
  const navigate = useNavigate();
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : '';

  return (
    <div 
      onClick={() => navigate(`/movie/${movie.id}`)}
      className="w-full h-auto bg-[#0A0D1299] border border-[#181D27] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-stretch md:items-center group cursor-pointer hover:border-zinc-800 transition-all relative gap-4 md:gap-0"
    >
      
      {/* ─── AREA DATA ATAS (POSTER + TEKS DESKRIPSI) ─── */}
      <div className="w-full md:w-[978px] flex flex-row gap-4 md:gap-6 items-start">
        
        {/* POSTER */}
        <div className="w-[100px] sm:w-[130px] md:w-[182px] h-[150px] sm:h-[195px] md:h-[270px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-900 shrink-0 shadow-xl relative">
          <img
            src={getImageUrl(movie.poster_path, 'w342')}
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
            loading="lazy"
          />
        </div>

        {/* AREA DATA TEKS */}
        <div className="flex-1 flex flex-col gap-2 md:gap-6 justify-start pt-1 min-w-0 md:pr-12">
          <div className="flex flex-col gap-1 md:gap-3">
            <h2 className="text-base md:text-[24px] font-bold text-[#FDFDFD] font-display tracking-tight truncate">
              {movie.title} {releaseYear && <span className="text-xs md:text-sm font-normal text-zinc-500">({releaseYear})</span>}
            </h2>
            
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 md:w-[22px] md:h-[22px] text-[#E4A802] fill-[#E4A802]" />
              <span className="text-xs md:text-base font-medium text-[#FDFDFD] font-body leading-none">
                {movie.vote_average ? `${movie.vote_average.toFixed(1)}/10` : '0.0/10'}
              </span>
            </div>
          </div>

          <p className="text-xs md:text-sm font-normal text-[#A4A7AE] font-body leading-relaxed line-clamp-2 md:line-clamp-3">
            {movie.overview || 'Sinopsis cerita belum tersedia untuk katalog judul film ini.'}
          </p>

          {/* TOMBOL TRAILER VERSION DESKTOP */}
          <div className="hidden md:block w-[200px] h-[52px] mt-2" onClick={(e) => e.stopPropagation()}>
            <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
              <DialogTrigger asChild>
                <Button variant="redFigma" className="w-full h-full font-semibold text-sm rounded-full gap-3 cursor-pointer">
                  <span>Watch Trailer</span>
                  <div className="w-6 h-6 md:w-[28px] md:h-[28px] rounded-full bg-white flex items-center justify-center">
                    <Play className="w-3 h-3 md:w-3.5 md:h-3.5 fill-[#B91C1C] text-[#B91C1C] ml-[2px]" />
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 bg-black border-none aspect-video">
                {isTrailerOpen && <TrailerFetcher movieId={movie.id} title={movie.title} />}
              </DialogContent>
            </Dialog>
          </div>
        </div>

      </div>

      {/* LANTAI BAWAH: AKSI GRUP TOMBOL KHUSUS MODE MOBILE  */}
      <div className="flex md:hidden items-center gap-3 w-full border-t border-zinc-900/60 pt-3" onClick={(e) => e.stopPropagation()}>
        <Dialog open={isTrailerOpen} onOpenChange={setIsTrailerOpen}>
          <DialogTrigger asChild>
            <Button variant="redFigma" className="w-[301px] h-[44px] font-semibold text-xs rounded-full gap-2 flex-1">
              <span>Watch Trailer</span>
              <div className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center">
                <Play className="w-[10px] h-[10px] fill-[#B91C1C] text-[#B91C1C] ml-[1px]" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 bg-black border-none aspect-video">
            {isTrailerOpen && <TrailerFetcher movieId={movie.id} title={movie.title} />}
          </DialogContent>
        </Dialog>

        {/* HEART BUTTON DI SAMPING KANAN TRAILER (MOBILE VERSION) */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => onRemove()}
          className="w-[44px] h-[44px] rounded-full border-zinc-800 bg-zinc-900/40 text-[#961200] hover:bg-zinc-900 shrink-0"
        >
          <Heart className="w-4 h-4 fill-current stroke-current" />
        </Button>
      </div>

      {/* TOMBOL HEART UTK MODE DESKTOP */}
      <Button
        variant="outline"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="hidden md:flex w-[56px] h-[56px] rounded-full border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900 text-[#961200] shrink-0 transition-transform active:scale-95"
        title="Remove from Favorites"
      >
        <Heart className="w-5 h-5 fill-current stroke-current" />
      </Button>

    </div>
  );
}

export default function Favorite() {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useMovieStore();

  return (
    <div className="w-full bg-[#0A0D12] text-white min-h-screen pb-24 pt-24 md:pt-[154px] select-none">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 lg:px-[140px] flex flex-col gap-6 md:gap-12">
        
        <div className="w-full max-w-[1160px]">
          <h1 className="text-2xl md:text-[40px] font-bold tracking-[-2%] text-[#FDFDFD] font-display uppercase">
            Favorites
          </h1>
        </div>

        {favorites.length > 0 ? (
          <div className="w-full max-w-[1160px] flex flex-col gap-6 md:gap-[48px]">
            {favorites.map((movie) => (
              <FavoriteMovieRow 
                key={movie.id} 
                movie={movie} 
                onRemove={() => toggleFavorite(movie)} 
              />
            ))}
          </div>
        ) : (
          /* KONDISI DATA EMPTY: KALIBRASI PIXEL-PERFECT FIGMA & ONE LINE TEXT  */
          
          <div className="w-full max-w-[1160px] flex flex-col items-center justify-center py-24 text-center gap-6">
            
            {/* Pembungkus Gambar & Teks (width 246px, gap 16px) */}
            <div className="flex flex-col items-center gap-4">
              
              {/* Tempat Gambar Utama Aset (width 200px, height 200px) */}
              <div className="w-[200px] h-[200px] flex items-center justify-center relative bg-transparent overflow-hidden">
                <img 
                  src={MovieEmptyImg} 
                  alt="Empty Movie" 
                  className="w-full h-full object-contain"
                  style={{ mixBlendMode: 'normal' }}
                  draggable="false"
                />
              </div>

              {/* Kelompok Teks: Data Empty + Deskripsi (width 246px, height 66px, gap 8px) */}
              <div className="flex flex-col items-center gap-2">
                {/* Judul: font-weight 600 (SemiBold), warna #FFFFFF */}
                <h3 className="text-base md:text-lg font-semibold tracking-normal text-[#FFFFFF] font-body">
                  Data Empty
                </h3>
                <p className="text-xs md:text-sm font-normal tracking-normal text-[#A4A7AE] font-body leading-normal whitespace-nowrap">
                  You don't have a favorite movie yet.
                </p>
              </div>

            </div>

            <Button
              onClick={() => navigate('/')}
              className="w-[300px] h-[52px] bg-[#961200] hover:bg-red-800 text-[#FDFDFD] font-semibold text-base rounded-full shadow-lg transition-transform active:scale-95 cursor-pointer flex items-center justify-center p-[12px]"
            >
              Explore Movie
            </Button>

          </div>
        )}

      </div>
    </div>
  );
}