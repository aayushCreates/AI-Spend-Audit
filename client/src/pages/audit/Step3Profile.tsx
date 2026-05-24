import { ArrowLeft, ArrowRight } from "lucide-react";

interface Step3Props {
  data: any;
  updateData: (data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Step3Profile({ data, updateData, onNext, onPrev }: Step3Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData({
      profile: {
        ...data.profile,
        [e.target.name]: e.target.value
      }
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-6 flex flex-col gap-6">

      <p className="text-gray-400 mb-4">
        Optional But helps us tailor your audit summary. Skip if you'd rather not share.
      </p>

      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={data.profile.name}
          onChange={handleChange}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Company
        </label>
        <input
          type="text"
          name="company"
          value={data.profile.company}
          onChange={handleChange}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-white mb-2">
          Role
        </label>
        <select
          name="role"
          value={data.profile.role}
          onChange={handleChange}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all"
        >
          <option value="" disabled>Select...</option>
          <option value="founder">Founder / CEO</option>
          <option value="engineering">Engineering Leader</option>
          <option value="finance">Finance Leader</option>
          <option value="other">Other</option>
        </select>
      </div>

            <div className="mt-1 flex justify-between items-center">
        <button
          onClick={onPrev}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={onNext}
          className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(74,222,128,0.3)]"
        >
          Run audit
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
