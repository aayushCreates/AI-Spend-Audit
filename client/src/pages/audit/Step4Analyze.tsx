import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import type { AuditInput, ToolInput } from "../../types/audit";

interface Step4Props {
  onComplete: (auditData: any) => void;
  formData: any;
}

export default function Step4Analyze({ onComplete, formData }: Step4Props) {
  const [progress, setProgress] = useState(0);

  const stages = [
    "Checking plan fit for your tools...",
    "Comparing 23 alternative configurations...",
    "Calculating your savings...",
  ];

  useEffect(() => {
    let auditData: any = null;
    let isAuditDone = false;

    const runAudit = async () => {
      try {
        const toolsArray: ToolInput[] = Object.entries(formData.tools)
          .filter(([key, value]: any) => value.active)
          .map(([key, value]: [string, any]) => ({
            toolId: key as ToolInput["toolId"],
            planId: value.plan,
            seats: parseInt(value.seats, 10) || 1,
            monthlySpendOverride: value.override
              ? parseFloat(value.override)
              : undefined,
          }));

        const payload: AuditInput = {
          teamSize: formData.teamSize,
          useCases: formData.useCases,
          estimatedBudget: formData.budget,
          tools: toolsArray,
          profile: formData.profile,
        };

        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await axios.post(`${apiUrl}/audit`, payload, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.success && res.data.data) {
          auditData = res.data.data;
        }
      } catch (err) {
        console.error("Failed to run audit", err);
      } finally {
        isAuditDone = true;
      }
    };
    runAudit();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 99 && !isAuditDone) {
          return 99;
        }
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(auditData), 500);
          return 100;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete, formData]);

  let stage = 0;
  if (progress < 30) stage = 0;
  else if (progress < 70) stage = 1;
  else stage = 2;

  return (
    <div className="w-full max-w-2xl mx-auto px-6 mt-16 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">
        Analyzing your stack...
      </h1>
      <p className="text-gray-400 text-sm mb-16">
        Hang tight, this only takes a moment.
      </p>

      <div className="w-full max-w-md flex flex-col gap-4">
        {stages.map((text, idx) => {
          const isActive = stage === idx;
          const isDone = stage > idx;
          const isPending = stage < idx;

          let borderColor = "border-white/5";
          let opacity = "opacity-40";
          let textColor = "text-gray-500";

          if (isActive) {
            borderColor = "border-white/20";
            opacity = "opacity-100";
            textColor = "text-white";
          } else if (isDone) {
            borderColor = "border-green-500/30";
            opacity = "opacity-100";
            textColor = "text-gray-300";
          }

          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-4 rounded-2xl border bg-[#0A0A0A] transition-all duration-500 ${borderColor} ${opacity}`}
            >
              <span
                className={`font-medium ${textColor} transition-colors duration-500`}
              >
                {text}
              </span>

              <div className="w-6 h-6 flex items-center justify-center">
                {isDone && (
                  <Check className="w-5 h-5 text-green-500 animate-in zoom-in" />
                )}
                {isActive && (
                  <div className="w-4 h-4 rounded-full border-2 border-green-500 border-t-transparent animate-spin"></div>
                )}
                {isPending && (
                  <div className="w-2 h-2 rounded-full bg-gray-700"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-full max-w-md mt-16 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(74,222,128,0.5)]"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
