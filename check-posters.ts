// check-posters.ts
import { prisma } from "./src/lib/prisma";

async function main() {
  const total = await prisma.movie.count();

  const semPoster = await prisma.movie.count({
    where: { posterPath: null },
  });

  console.log(`Total de filmes: ${total}`);
  console.log(`Sem poster: ${semPoster}`);
  console.log(`Com poster: ${total - semPoster}`);

  // Opcional: listar quais filmes estão sem poster
  if (semPoster > 0) {
    const filmesSemPoster = await prisma.movie.findMany({
      where: { posterPath: null },
      select: { id: true, title: true, oscarBaseMovieId: true },
    });
    console.log("\nFilmes sem poster:");
    console.table(filmesSemPoster);
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
