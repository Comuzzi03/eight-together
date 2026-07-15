export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
      <div className="max-w-md mx-auto flex justify-around py-4 text-white">

        <button className="flex flex-col items-center text-green-400">
          <span>🏠</span>
          <span className="text-xs">Home</span>
        </button>

        <button className="flex flex-col items-center">
          <span>💪</span>
          <span className="text-xs">Workout</span>
        </button>

        <button className="flex flex-col items-center">
          <span>📈</span>
          <span className="text-xs">Progressi</span>
        </button>

        <button className="flex flex-col items-center">
          <span>❤️</span>
          <span className="text-xs">Coppia</span>
        </button>

        <button className="flex flex-col items-center">
          <span>👤</span>
          <span className="text-xs">Profilo</span>
        </button>

      </div>
    </div>
  );
}
