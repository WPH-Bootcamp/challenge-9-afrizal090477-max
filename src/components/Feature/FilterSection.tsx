import { SORT_OPTIONS } from '@/lib/constants';

interface FilterSectionProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

export default function FilterSection({ sortBy, onSortChange }: FilterSectionProps) {
  return (
    <div className="flex items-center gap-3 justify-end bg-zinc-900/40 p-3 rounded-xl border border-zinc-900/80 w-full sm:w-auto">
      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider whitespace-nowrap">
        Urutkan:
      </span>
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none p-2 cursor-pointer transition-all hover:border-zinc-700"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}