import { SearchX, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NoAuditFound() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#050505] text-white flex items-center justify-center p-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-md bg-[#0A0A0A] border border-white/10 p-10 rounded-3xl shadow-2xl">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <SearchX className="w-10 h-10 text-gray-400" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-4 tracking-tight">
          No Audit Data Found
        </h1>

        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          We couldn't find the results you were looking for. The audit data
          might have expired, or you haven't completed one yet. Let's find your
          AI savings now.
        </p>

        <button
          onClick={() => navigate("/audit")}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(74,222,128,0.3)] hover:shadow-[0_0_30px_rgba(74,222,128,0.5)]"
        >
          Run a New Audit
          <ArrowRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate("/")}
          className="mt-4 text-sm text-gray-500 hover:text-white transition-colors"
        >
          Return to home
        </button>
      </div>
    </div>
  );
}
