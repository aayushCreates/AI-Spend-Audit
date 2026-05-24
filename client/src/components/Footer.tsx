export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 px-6 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-green-500 rounded-sm flex items-center justify-center transform rotate-45 opacity-50">
          <div className="w-1.5 h-1.5 bg-black rounded-sm transform -rotate-45"></div>
        </div>
        <span className="font-semibold text-gray-400">SpendLens</span>
        <span className="text-gray-600">— AI spend, optimized.</span>
      </div>
      <div>
        Powered by <span className="text-green-400/80 font-medium hover:text-green-400 cursor-pointer transition-colors">Credex</span>
      </div>
    </footer>
  );
}
