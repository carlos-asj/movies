"use client";

import { useState } from "react";
import { ShuffleLoading } from "./ShuffleLoading";

interface Movie {
  id: number;
  title: string;
  year: number;
  category: string;
  posterPath: string | null;
  overview: string | null;
}

export function MovieCard({ movie: initialMovie }: { movie: Movie }) {
  const [movie, setMovie] = useState<Movie | null>(initialMovie);
  const [isSaving, setIsSaving] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlerMarkAsWatched() {
    if (!movie) return;
    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch(`/api/movies/${movie.id}/watched`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Falha ao marcar como assistido");

      await handleShuffle();
    } catch (Err) {
      setError("Não foi possível salvar. Tente novamente.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleShuffle() {
    setIsShuffling(true);
    setError(null);

    try {
      const res = await fetch("/api/movies/random-unwatched");

      if (res.status === 404) {
        setMovie(null);
        return;
      }

      if (!res.ok) throw new Error("Falha ao buscar filme");

      const nextMovie = await res.json();
      setMovie(nextMovie);
    } catch (err) {
      setError("Não foi possível buscar um novo filme.");
    } finally {
      setIsShuffling(false);
    }
  }

  if (!movie) {
    return <p>Todos os filmes foram assistidos!</p>;
  }

  if (isShuffling) {
    return <ShuffleLoading />;
  }

  return (
    <div className="flex flex-col justify-center min-h-screen animate-pop-in">
      <div className="flex justify-center mb-4">
        {movie.posterPath && (
          <img src={movie.posterPath} alt={movie.title} width={250} />
        )}
      </div>
      <h1 className="text-center font-bold text-3xl text-white italic">
        {movie.title}
      </h1>
      <span className="text-center text-[#470104] italic">{movie.year}</span>
      {movie.overview && <p className="mx-4 text-white">{movie.overview}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="flex flex-col gap-4 mt-4">
        <button
          className="py-5 rounded-full mx-10 bg-[#FFA900] text-white text-xl"
          onClick={handleShuffle}
          disabled={isSaving || isShuffling}
        >
          {isShuffling ? "Sorteando..." : "Sortear outro"}
        </button>
        <button
          className="underline text-xl text-white"
          onClick={handlerMarkAsWatched}
          disabled={isSaving || isShuffling}
        >
          {isSaving ? "Salvando..." : "Marcar como assistido"}
        </button>
      </div>
    </div>
  );
}
