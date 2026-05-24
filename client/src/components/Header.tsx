export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-green-500 rounded-sm flex items-center justify-center transform rotate-45">
          <div className="w-2.5 h-2.5 bg-black rounded-sm transform -rotate-45"></div>
        </div>
        <span className="font-semibold text-lg tracking-tight">SpendLens</span>
      </div>
      <div className="text-xs text-gray-500 flex items-center gap-1.5">
        Built by <span className="text-green-400 font-medium">Credex</span>
      </div>
    </header>
  );
}
