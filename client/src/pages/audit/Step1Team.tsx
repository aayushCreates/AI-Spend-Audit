import { ArrowLeft, ArrowRight, Minus, Plus, Users } from "lucide-react";

interface Step1Props {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
}

export default function Step1Team({ data, updateData, onNext }: Step1Props) {
  const useCasesList = [
    "Coding",
    "Writing",
    "Data Analysis",
    "Research",
    "Customer Support",
    "Mixed",
  ];

  const toggleUseCase = (useCase: string) => {
    if (data.useCases.includes(useCase)) {
      updateData({
        useCases: data.useCases.filter((uc: string) => uc !== useCase),
      });
    } else {
      updateData({ useCases: [...data.useCases, useCase] });
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateData({ budget: parseInt(e.target.value) });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 flex flex-col gap-10">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Team size</h2>
        <p className="text-gray-400 text-sm mb-4">
          How many people use AI tools?
        </p>

        <div className="flex items-center gap-4 bg-[#0A0A0A] border border-white/10 rounded-2xl p-2 w-full max-w-sm transition-colors hover:border-white/20 focus-within:border-green-500/50">
          <button
            onClick={() =>
              updateData({ teamSize: Math.max(1, (data.teamSize || 1) - 1) })
            }
            className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#050505] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all active:scale-95"
          >
            <Minus className="w-5 h-5" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center py-2 relative group">
            <Users className="w-5 h-5 text-green-500/50 absolute left-2 opacity-50 pointer-events-none" />
            <input
              type="number"
              min="1"
              value={data.teamSize || ""}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                updateData({ teamSize: isNaN(val) ? "" : Math.max(1, val) });
              }}
              onBlur={() => {
                if (!data.teamSize || data.teamSize < 1)
                  updateData({ teamSize: 1 });
              }}
              className="w-full bg-transparent text-center text-4xl font-bold text-white focus:outline-none focus:ring-0 p-0 m-0 tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              style={{ MozAppearance: "textfield" }}
            />
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">
              {data.teamSize === 1 ? "Member" : "Members"}
            </span>
          </div>

          <button
            onClick={() => updateData({ teamSize: (data.teamSize || 1) + 1 })}
            className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#050505] border border-white/5 text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-1">Primary use cases</h2>
        <p className="text-gray-400 text-sm mb-4">Select all that apply.</p>

        <div className="flex flex-wrap gap-3">
          {useCasesList.map((useCase) => {
            const isSelected = data.useCases.includes(useCase);
            return (
              <button
                key={useCase}
                onClick={() => toggleUseCase(useCase)}
                className={`py-2 px-4 rounded-lg text-sm font-medium border transition-all ${
                  isSelected
                    ? "border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_10px_rgba(74,222,128,0.1)]"
                    : "border-white/10 text-gray-400 bg-[#0A0A0A] hover:border-white/20 hover:text-gray-300"
                }`}
              >
                {useCase}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-1">
          Monthly AI budget estimate
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          Roughly what you spend across all AI tools.
        </p>

        <div className="flex items-center gap-6">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={data.budget}
            onChange={handleSliderChange}
            className="bg-green-500 shadow-[0_0_10px_rgba(74,222,128,0.5)] flex-1 accent-green-500"
          />
          <span className="text-2xl font-bold text-green-400 w-24 text-right tabular-nums">
            ${data.budget.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="flex justify-between mt-1">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
        >
          Continue
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
