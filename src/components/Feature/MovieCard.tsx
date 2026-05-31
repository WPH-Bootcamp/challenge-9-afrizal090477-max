import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react'; 
import { getImageUrl } from '@/lib/utils';
import { type MovieCardProps } from '../../types/layout'; 

export default function MovieCard({ movie, index }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col gap-[8px] md:gap-[12px] min-w-[173px] w-[173px] md:min-w-[216px] md:w-[216px] h-[334px] md:h-[397px] select-none group cursor-pointer snap-start shrink-0"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      {/* ─── 1. AREA POSTER GAMBAR ─── */}
      <div className="relative w-full h-[266px] md:h-[321px] rounded-xl overflow-hidden bg-[#181D27] border border-transparent group-hover:border-zinc-700 transition-colors duration-300">
        <img
          src={getImageUrl(movie.poster_path, 'w342')} 
          alt={movie.title}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable="false"
        />

        {/* BADGE ANGKA PERINGKAT FIGMA */}
        {typeof index === 'number' && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#181D27]/80 backdrop-blur-md flex items-center justify-center z-20">
            <span className="text-[#FDFDFD] font-bold text-xs md:text-sm leading-none">
              {index + 1}
            </span>
          </div>
        )}
      </div>

      {/* ─── 2. AREA DATA TEKS ─── */}
      <div className="w-full flex flex-col gap-[2px] justify-start h-[60px] md:h-[64px]">
        <h3 className="font-semibold md:font-bold text-[16px] md:text-[15px] text-[#FDFDFD] truncate tracking-tight group-hover:text-red-500 transition-colors leading-tight">
          {movie.title}
        </h3>

        <div className="flex items-center gap-[4px] md:gap-1.5 h-[28px] md:h-[24px]">
          <Star className="w-[16px] h-[16px] md:w-4 md:h-4 text-[#E4A802] fill-[#E4A802]" />
          
          <div className="flex items-baseline gap-[1px]">
            <span className="text-[14px] md:text-[13px] font-normal md:font-bold text-[#A4A7AE] md:text-[#FDFDFD] leading-none">
              {movie.vote_average ? movie.vote_average.toFixed(1) : '0.0'}
            </span>
            <span className="text-[14px] md:text-[11px] font-normal md:font-medium text-[#A4A7AE] md:text-[#98A2B3] leading-none">
              /10
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}