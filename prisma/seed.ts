import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const OSCARBASE_URL = "https://api.oscarbase.com/api/nominations";

interface OscarBaseNomination {
  movie_id: number;
  movie: string;
  ceremony_year: number;
  category: string;
}

interface OscarBaseResponse {
  data: OscarBaseNomination[];
  pagination: {
    hasNextPage: boolean;
  };
}

interface OscarBaseMovie {
  id: number;
  poster_path?: string;
  overview?: string;
}

async function fetchAllWinners(): Promise<OscarBaseNomination[]> {
  const allWinners: OscarBaseNomination[] = [];
  let page = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const url = `${OSCARBASE_URL}?category=Best+Picture&winner=true&page=${page}&limit=100`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const json: OscarBaseResponse = await response.json();
    allWinners.push(...json.data);

    hasNextPage = json.pagination.hasNextPage;
    page++;

    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  return allWinners;
}

async function fetchMovieDetails(
  movieId: number,
): Promise<OscarBaseMovie | null> {
  const response = await fetch(
    `https://api.oscarbase.com/api/movies/${movieId}`,
  );
  if (!response.ok) {
    console.warn(
      `Falha ao buscar detalhes do filme ${movieId}: ${response.status}`,
    );
    return null;
  }
  return response.json();
}

async function main() {
  console.log("Buscanso filmes...");
  const winners = await fetchAllWinners();
  console.log(`${winners.length} registros de filmes encontrados.`);

  const uniqueMovieIds = [...new Set(winners.map((w) => w.movie_id))];
  console.log(`${uniqueMovieIds.length} filmes únicos.`);

  for (const nomination of winners) {
    const details = await fetchMovieDetails(nomination.movie_id);

    await prisma.movie.upsert({
      where: { oscarBaseMovieId: nomination.movie_id },
      update: {},
      create: {
        oscarBaseMovieId: nomination.movie_id,
        title: nomination.movie,
        year: nomination.ceremony_year,
        category: nomination.category,
        posterPath: details?.poster_path ?? null,
        overview: details?.overview ?? null,
      },
    });

    await new Promise((resolve) => setTimeout(resolve, 700));
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
