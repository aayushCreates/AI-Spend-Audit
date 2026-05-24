import { BarChart3, HandCoins, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Enter your tools",
      description: "Pick what you use and how many seats.",
      icon: Sparkles,
    },
    {
      id: "02",
      title: "Get your audit",
      description: "Markup, price break-band & ROI metrics.",
      icon: BarChart3,
    },
    {
      id: "03",
      title: "Save money",
      description: "Close out loss, real dollar amounts.",
      icon: HandCoins,
    },
  ];

  return (
    <section className="py-24 px-4 bg-linear-to-b from-transparent to-black/50 border-t border-white/5">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">How it works</h2>
        <p className="text-gray-400 mb-16 text-sm">
          Three steps. No spreadsheets. No procurement call.
        </p>

        <div className="grid md:grid-cols-3 gap-12 md:gap-4 relative">
          <div className="hidden md:block absolute top-6 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-green-500/30 to-transparent z-0"></div>

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="flex flex-col items-center relative z-10 group cursor-default border border-white/20 rounded-xl p-6 hover:border-green-500/50"
              >
                <div className="w-12 h-12 rounded-full bg-black border border-green-500/30 flex items-center justify-center text-green-400 font-semibold mb-6 shadow-[0_0_15px_rgba(74,222,128,0.1)] group-hover:border-green-400 group-hover:shadow-[0_0_25px_rgba(74,222,128,0.3)] transition-all duration-300 group-hover:scale-110">
                  {step.id}
                </div>
                <div className="mb-4 text-gray-500 group-hover:text-green-400 transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-400 text-center max-w-[250px] group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
