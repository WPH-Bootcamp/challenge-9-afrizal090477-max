import { useForm, useWatch } from 'react-hook-form'; // 👈 Tambahkan useWatch di sini
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, { message: 'Kata kunci pencarian tidak boleh kosong' })
    .max(50, { message: 'Kata kunci terlalu panjang (maksimal 50 karakter)' }),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
}

export default function SearchBar({ onSearch, initialValue = '' }: SearchBarProps) {
  const {
    register,
    handleSubmit,
    setValue,
    control, // 👈 Ambil control dari useForm
    formState: { errors },
  } = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: initialValue,
    },
  });


  const queryValue = useWatch({
    control,
    name: 'query',
  });

  const onSubmit = (data: SearchFormValues) => {
    onSearch(data.query);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-1.5">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Cari film favoritmu di sini..."
            {...register('query')}
            className={`w-full px-4 py-3 rounded-xl bg-zinc-900 border text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all text-sm
              ${errors.query ? 'border-red-500 focus:ring-red-500' : 'border-zinc-800 focus:ring-blue-500'}`}
          />
          
          {queryValue && (
            <button
              type="button"
              onClick={() => {
                setValue('query', '');
                onSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs font-bold transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md shrink-0"
        >
          Cari
        </button>
      </form>

      {errors.query && (
        <span className="text-xs text-red-500 pl-1">
          {errors.query.message}
        </span>
      )}
    </div>
  );
}