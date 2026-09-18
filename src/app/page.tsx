import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-6 p-4 text-center">
      <h1 className="text-2xl text-[#FFA900]">Noite do Oscar</h1>
      <div className="">
        <Link
          href="/sorteio"
          className="px-15 py-5 bg-[#FFA900] text-xl rounded-full hover:bg-gray-800 transition
          inset-shadow-md inset-shadow-black-900"
        >
          Sortear filme
        </Link>
      </div>
    </main>
  );
}
