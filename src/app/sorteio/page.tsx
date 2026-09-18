import { prisma } from "@/lib/prisma";
import { MovieCard } from "../components/MovieCard";

async function getRandomUnwatchedMovie() {
  const count = await prisma.movie.count({ where: { watched: false } });
  if (count === 0) return null;

  const randomIndex = Math.floor(Math.random() * count);
  return prisma.movie.findFirst({
    where: { watched: false },
    skip: randomIndex,
  });
}

export default async function Home() {
  const movie = await getRandomUnwatchedMovie();

  return (
    <main>
      {movie ? (
        <MovieCard movie={movie} />
      ) : (
        <p>Todos os filmes foram assistidos!</p>
      )}
    </main>
  );
}
