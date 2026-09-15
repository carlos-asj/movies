import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const movie = await prisma.movie.update({
      where: { id: Number(id) },
      data: { watched: true },
    });

    return NextResponse.json(movie);
  } catch (error) {
    if ((error as any).code === "P2025") {
      return NextResponse.json(
        { message: "Filme não encontrado." },
        { status: 404 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { message: "Erro ao atualizar filme." },
      { status: 500 },
    );
  }
}
