import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.movie.count({
      where: { watched: false },
    });

    if (count === 0) {
      return NextResponse.json(
        { message: "Todos os filmes foram assistidos." },
        { status: 404 },
      );
    }

    const randomIndex = Math.floor(Math.random() * count);

    const movie = await prisma.movie.findFirst({
      where: { watched: false },
      skip: randomIndex,
    });

    return NextResponse.json(movie);
  } catch (error) {
    console.error("Internal server error");
    return NextResponse.json({ message: "Erro no GET" }, { status: 500 });
  }
}
