import Link from "next/link";

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-md mx-auto flex justify-around py-4 text-white">

        <Link
          href="/"
          className="flex flex-col items-center text-green-400"
        >
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/select-user"
          className="flex flex-col items-center"
        >
          <span>💪</span>
          <span className="text-xs">Workout</span>
        </Link>

        <Link
          href="/weight-history"
          className="flex flex-col items-center"
        >
          <span>📈</span>
          <span className="text-xs">Progressi</span>
        </Link>

        <Link
          href="/history"
          className="flex flex-col items-center"
        >
          <span>❤️</span>
          <span className="text-xs">Coppia</span>
        </Link>

        <Link
          href="/"
          className="flex flex-col items-center"
        >
          <span>👤</span>
          <span className="text-xs">Profilo</span>
        </Link>

      </div>
    </div>
  );
}
