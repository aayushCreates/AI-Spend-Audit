import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1Team from "./Step1Team";
import Step2Tools from "./Step2Tools";
import Step3Profile from "./Step3Profile";
import Step4Analyze from "./Step4Analyze";
import Header from "../../components/Header";

export default function AuditWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    teamSize: 1,
    useCases: [] as string[],
    budget: 1000,
    tools: {} as Record<string, any>,
    profile: { name: "", company: "", role: "" },
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const sections = ["TEAM", "TOOLS", "PROFILE", "AUDIT"];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center">
            <Header />

            <div className="w-full max-w-3xl px-6 mt-4 mb-12">
        <div className="flex justify-between text-xs font-semibold text-gray-400 mb-4 tracking-widest uppercase">
          <span>STEP {step} OF 4</span>
          <span className="text-white">{sections[step - 1]}</span>
        </div>
        <div className="flex gap-2 h-1.5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={`flex-1 rounded-full transition-colors duration-500 ${
                i <= step
                  ? "bg-green-500 shadow-[0_0_10px_rgba(74,222,128,0.5)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      </div>

            <div className="flex-1 w-full flex flex-col pb-24">
        {step === 1 && (
          <Step1Team
            data={formData}
            updateData={(data) => setFormData({ ...formData, ...data })}
            onNext={nextStep}
          />
        )}
        {step === 2 && (
          <Step2Tools
            data={formData}
            updateData={(data) => setFormData({ ...formData, ...data })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 3 && (
          <Step3Profile
            data={formData}
            updateData={(data) => setFormData({ ...formData, ...data })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}
        {step === 4 && (
          <Step4Analyze onComplete={(data) => navigate("/result", { state: { data } })} formData={formData} />
        )}
      </div>
    </div>
  );
}
