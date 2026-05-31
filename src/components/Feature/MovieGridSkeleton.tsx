export default function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      {[...Array(12)].map((_, idx) => (
        <div 
          key={idx} 
          className="animate-pulse bg-zinc-900 rounded-xl h-[340px] w-full border border-zinc-800 flex flex-col p-4 justify-between"
        >
          <div className="bg-zinc-800 flex-1 rounded-lg w-full h-4/5" />
          <div className="space-y-2 mt-3">
            <div className="h-4 bg-zinc-800 rounded w-5/6" />
            <div className="h-3 bg-zinc-800 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}