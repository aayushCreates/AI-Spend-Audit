import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-20 pb-32 px-4 text-center max-w-4xl mx-auto">
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Sparkles className="w-3.5 h-3.5 text-green-400" />
          AI Spend Audit v1.0
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          You're probably <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-green-500 to-green-400 drop-shadow-[0_0_25px_rgba(74,222,128,0.5)]">
            overpaying
          </span>{" "}
          for AI. <br />
          Let's find out.
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Free 2-minute audit of your AI tool stack. No signup required. See
          your savings instantly.
        </p>

        <button
          onClick={() => navigate("/audit")}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-xl flex items-center gap-2 mx-auto transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(74,222,128,0.4)] hover:shadow-[0_0_60px_rgba(74,222,128,0.6)]"
        >
          Audit My AI Stack
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-gray-500 mt-6 font-medium tracking-wide">
          Used by 200+ startups · No credit card · Results in 60 seconds
        </p>

                <div className="mt-16 inline-block bg-[#0A0A0A] border border-white/20 rounded-2xl p-6 shadow-2xl">
          <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase mb-2">
            Total Savings Found This Week
          </p>
          <p className="relative z-10 text-4xl md:text-5xl font-bold text-green-500 tracking-tight drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
            $124,840
          </p>
        </div>
      </div>
    </section>
  );
}
