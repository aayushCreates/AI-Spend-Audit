import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface Step2Props {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const AVAILABLE_TOOLS = [
  { 
    id: "cursor", 
    name: "Cursor", 
    iconColor: "bg-black",
    defaultPlan: "pro",
    plans: [
      { id: "hobby", name: "Hobby", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "business", name: "Business", price: 40 }
    ]
  },
  { 
    id: "github_copilot", 
    name: "GitHub Copilot", 
    iconColor: "bg-orange-600",
    defaultPlan: "business",
    plans: [
      { id: "individual", name: "Individual", price: 10 },
      { id: "business", name: "Business", price: 19 },
      { id: "enterprise", name: "Enterprise", price: 39 }
    ]
  },
  { 
    id: "claude", 
    name: "Claude", 
    iconColor: "bg-amber-100 text-black",
    defaultPlan: "pro",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "pro", name: "Pro", price: 20 },
      { id: "team", name: "Team", price: 30 },
      { id: "max", name: "Max", price: 100 },
      { id: "api_direct", name: "API Direct", price: 0 }
    ]
  },
  { 
    id: "chatgpt", 
    name: "ChatGPT", 
    iconColor: "bg-emerald-600",
    defaultPlan: "plus",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "plus", name: "Plus", price: 20 },
      { id: "team", name: "Team", price: 30 },
      { id: "api_direct", name: "API Direct", price: 0 }
    ]
  },
  { 
    id: "anthropic_api", 
    name: "Anthropic API", 
    iconColor: "bg-rose-400",
    defaultPlan: "api_direct",
    plans: [
      { id: "api_direct", name: "API Direct (Pay as you go)", price: 0 }
    ]
  },
  { 
    id: "openai_api", 
    name: "OpenAI API", 
    iconColor: "bg-zinc-800",
    defaultPlan: "api_direct",
    plans: [
      { id: "api_direct", name: "API Direct (Pay as you go)", price: 0 }
    ]
  },
  { 
    id: "gemini", 
    name: "Gemini", 
    iconColor: "bg-blue-600",
    defaultPlan: "advanced",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "advanced", name: "Advanced", price: 20 },
      { id: "business", name: "Business (Workspace)", price: 24 },
      { id: "api_direct", name: "API Direct", price: 0 }
    ]
  },
  { 
    id: "windsurf", 
    name: "Windsurf", 
    iconColor: "bg-teal-600",
    defaultPlan: "pro",
    plans: [
      { id: "free", name: "Free", price: 0 },
      { id: "pro", name: "Pro", price: 15 },
      { id: "teams", name: "Teams", price: 35 }
    ]
  },
];

export default function Step2Tools({ data, updateData, onNext, onPrev }: Step2Props) {
  useEffect(() => {
    if (Object.keys(data.tools).length === 0) {
      const initialTools = AVAILABLE_TOOLS.reduce((acc, tool) => {
        acc[tool.id] = { active: false, plan: tool.defaultPlan, seats: 1, override: "" };
        return acc;
      }, {} as any);
      updateData({ tools: initialTools });
    }
  }, []);

  let totalSpend = 0;
  if (data.tools) {
    Object.keys(data.tools).forEach((key) => {
      const toolState = data.tools[key];
      if (toolState.active) {
        const toolDef = AVAILABLE_TOOLS.find(t => t.id === key);
        const planDef = toolDef?.plans.find(p => p.id === toolState.plan);
        const price = planDef?.price || 0;
        
        const seats = parseInt(toolState.seats) || 0;
        const override = parseFloat(toolState.override);
        if (!isNaN(override)) {
          totalSpend += override;
        } else {
          totalSpend += price * seats;
        }
      }
    });
  }

  const updateTool = (id: string, field: string, value: any) => {
    updateData({
      tools: {
        ...data.tools,
        [id]: { ...data.tools[id], [field]: value }
      }
    });
  };

  const toggleTool = (id: string) => {
    updateTool(id, "active", !data.tools[id]?.active);
  };

  if (Object.keys(data.tools).length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-24 relative">
      <div className="flex flex-col gap-4">
        {AVAILABLE_TOOLS.map((tool) => {
          const state = data.tools[tool.id];
          const isActive = state?.active;
          const currentPlan = tool.plans.find(p => p.id === state?.plan);
          const currentPrice = currentPlan?.price || 0;

          return (
            <div
              key={tool.id}
              className={`bg-[#0A0A0A] border rounded-2xl overflow-hidden transition-all duration-300 ${isActive ? "border-green-500/50" : "border-white/10"
                }`}
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => toggleTool(tool.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${tool.iconColor}`}>
                    {tool.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{tool.name}</h3>
                    {isActive && currentPrice > 0 && (
                      <p className="text-xs text-green-400 font-medium">${currentPrice}/mo</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                    We use this
                  </span>
                  <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isActive ? 'bg-green-500' : 'bg-gray-800'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ${isActive ? 'left-6' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>

              {isActive && (
                <div className="p-4 border-t border-white/5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Plan</label>
                    <select
                      value={state.plan}
                      onChange={(e) => updateTool(tool.id, "plan", e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50"
                    >
                      {tool.plans.map(plan => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} {plan.price > 0 ? `— $${plan.price}/seat` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Seats</label>
                    <input
                      type="number"
                      min="1"
                      value={state.seats}
                      onChange={(e) => updateTool(tool.id, "seats", e.target.value)}
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Actual bill override (optional)</label>
                    <input
                      type="text"
                      value={state.override}
                      onChange={(e) => updateTool(tool.id, "override", e.target.value)}
                      placeholder="Leave blank to use plan price"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-green-500/50 placeholder:text-gray-700"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#050505]/90 backdrop-blur-md border-t border-white/10 z-50">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">

          <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-4 flex justify-between items-center shadow-2xl">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-1">Total Monthly Spend</p>
              <p className="text-xs text-gray-400">Based on plans + seats you selected.</p>
            </div>
            <div className="text-3xl font-bold text-green-400">
              ${totalSpend.toLocaleString()}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-500 hover:text-white hover:bg-white/5 transition-colors"
            >
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
      </div>
    </div>
  );
}
