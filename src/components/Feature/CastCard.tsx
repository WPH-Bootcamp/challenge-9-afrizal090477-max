import { getImageUrl } from '@/lib/utils';
import type { Cast } from '@/types/movie';

interface CastCardProps {
  cast: Cast;
}

export default function CastCard({ cast }: CastCardProps) {
  return (
    <div className="w-[360px] h-[104px] flex gap-4 items-center shrink-0">

      <div className="w-[69px] h-[104px] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
        <img
          src={getImageUrl(cast.profile_path, 'w185')}
          alt={cast.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="w-[275px] h-[64px] flex flex-col gap-1 justify-center">
        <p className="font-semibold text-sm text-[#FDFDFD] font-body truncate">
          {cast.name}
        </p>
        <p className="text-sm font-normal text-[#A4A7AE] font-body truncate">
          {cast.character}
        </p>
      </div>
    </div>
  );
}