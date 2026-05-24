import { MessageSquareQuote, Star } from "lucide-react";

export default function Testimonials() {
  const stats = [
    { value: "200+", label: "Startups audited" },
    { value: "$1.2M+", label: "Total savings found" },
    { value: "4.9/5", label: "Average rating" },
  ];

  const reviews = [
    {
      quote: "Found $1,200/mo of waste in 60 seconds. Wish I'd run this six months ago. The recommendations were spot-on.",
      initials: "MP",
      name: "Maya P.",
      title: "CTO · Series A eCommerce",
    },
    {
      quote: "We were paying business tier on everything. SpendLens caught it in the first scan. Downgraded 4 tools and saved $3,400/month.",
      initials: "JC",
      name: "James C.",
      title: "Eng Manager · DevTool",
    },
    {
      quote: "Best two minutes I've spent on procurement all year. Clean, actionable, and surprisingly accurate.",
      initials: "PS",
      name: "Priya S.",
      title: "Founder · AI SaaS",
    },
  ];

  return (
    <section className="py-24 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 mb-6 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <Star className="w-3 h-3 text-green-400 fill-green-400" />
          Loved by founders
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Don't take our word for it
        </h2>
        <p className="text-gray-400 text-sm">
          Startups saving thousands every month — here's what they're saying
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 text-center">
        {stats.map((stat, idx) => (
          <div key={idx} className="group cursor-default">
            <p className="text-3xl font-bold mb-1 text-white group-hover:text-green-400 group-hover:drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] transition-all duration-300">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 uppercase tracking-wider group-hover:text-gray-400 transition-colors duration-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, idx) => (
          <div 
            key={idx} 
            className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative group hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-all duration-300 transform hover:-translate-y-2 cursor-default"
          >
            <MessageSquareQuote className="w-6 h-6 text-green-500/20 absolute top-6 right-6 group-hover:text-green-500/40 transition-colors duration-300" />
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 text-green-400 fill-green-400 drop-shadow-[0_0_2px_rgba(74,222,128,0.5)]" />
              ))}
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6 group-hover:text-white transition-colors duration-300">
              "{review.quote}"
            </p>
            <div className="flex items-center gap-3 mt-auto">
              <div className="w-8 h-8 rounded-full bg-green-900 flex items-center justify-center text-xs font-bold text-green-400 group-hover:bg-green-500 group-hover:text-black transition-colors duration-300 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                {review.initials}
              </div>
              <div>
                <p className="text-sm font-medium group-hover:text-green-300 transition-colors duration-300">
                  {review.name}
                </p>
                <p className="text-xs text-gray-500">
                  {review.title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
