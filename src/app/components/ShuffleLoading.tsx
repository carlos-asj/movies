export function ShuffleLoading() {
  const seats = Array.from({ length: 8 });

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <p className="text-amber-400 tracking-widest text-sm uppercase">
        Sorteando indicado...
      </p>

      <div className="relative grid grid-cols-4 gap-3">
        {/* Holofote passando por cima dos cartões */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent" />
        </div>

        {seats.map((_, i) => (
          <div
            key={i}
            className="w-14 h-20 rounded-md bg-red-950 border border-amber-500/40 flex items-center justify-center"
          >
            <span className="text-amber-500/60 text-xl">🎬</span>
          </div>
        ))}
      </div>
    </div>
  );
}
