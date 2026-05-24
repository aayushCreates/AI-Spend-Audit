import {
  ArrowLeft,
  ChevronDown,
  Copy,
  Mail,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaXTwitter } from "react-icons/fa6";
import NoAuditFound from "../components/NoAuditFound";

import type { AuditResult, ToolRecommendation } from "../types/audit";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const auditData = location.state?.data as AuditResult | undefined;

  const [expandedReason, setExpandedReason] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  const [copied, setCopied] = useState(false);

  const onRestart = () => navigate("/");

  const handleNotify = async () => {
    if (!email || emailLoading) return;
    try {
      setEmailLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.post(`${apiUrl}/audit/send-email`, {
        id: auditData!.id,
        email,
      });
      setEmailSuccess(true);
      setEmail("");
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}?audit=${auditData!.id}`,
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareX = () => {
    const text = `I just found $${auditData!.totalAnnualSavings} in annual savings on my AI stack! Get your free audit:`;
    const url = `${window.location.origin}?audit=${auditData!.id}`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    );
  };

  const toggleReason = (tool: string) => {
    if (expandedReason === tool) setExpandedReason(null);
    else setExpandedReason(tool);
  };

  if (!auditData) {
    return (
      <div>
        <Header />
        <NoAuditFound />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden selection:bg-green-500/30 pb-20">
            <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#222 1px, transparent 1px), linear-gradient(90deg, #222 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-green-500/5 blur-[150px] rounded-full pointer-events-none"></div>

            <Header />

            <main className="relative z-10 max-w-6xl mx-auto px-6 mt-8">
                <button
          onClick={onRestart}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Run another audit
        </button>

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white drop-shadow-md">
            Your AI spend audit
          </h1>
          <span className="text-xs font-mono text-gray-600 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            #{auditData.id.slice(0, 10)}
          </span>
        </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 transition-all hover:border-white/20 hover:bg-white/2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Current Monthly Spend
            </p>
            <p className="text-4xl font-bold text-white tracking-tight">
              ${auditData.totalCurrentSpend}
            </p>
          </div>

                    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 transition-all hover:border-white/20 hover:bg-white/2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
              Potential Monthly Savings
            </p>
            <p className="text-4xl font-bold text-green-400 tracking-tight drop-shadow-[0_0_10px_rgba(74,222,128,0.2)]">
              ${auditData.totalMonthlySavings}
            </p>
          </div>

                    <div className="bg-[#0A0A0A] border border-green-500/40 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(74,222,128,0.1)] group">
            <div className="absolute inset-0 bg-linear-to-br from-green-500/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <p className="relative z-10 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Annual Savings Potential
            </p>
            <p className="relative z-10 text-4xl font-bold text-green-400 tracking-tight drop-shadow-[0_0_15px_rgba(74,222,128,0.4)]">
              ${auditData.totalAnnualSavings}
            </p>
          </div>
        </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-8">
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 relative hover:border-white/20 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-white">
                  Your personalized audit summary
                </h2>
                {auditData?.recommendations?.length > 0 && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {auditData.recommendations[0].toolName}
                  </span>
                )}
              </div>
              <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-wrap">
                {auditData.aiSummary ||
                  `Your stack of ${auditData?.recommendations?.length || 0} AI tools at $${auditData.totalCurrentSpend}/mo looks well right-sized for your team.`}
              </p>
            </div>

                        <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Tool-by-tool breakdown
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                Recommendations are based on your seat count, plan tier, and
                usage.
              </p>

              <div className="flex flex-col gap-4">
                {auditData?.recommendations?.map((rec: ToolRecommendation) => {
                  const isDowngrade =
                    rec.recommendationType === "downgrade" ||
                    rec.recommendationType === "switch" ||
                    rec.recommendationType === "overspending";
                  const borderColor = isDowngrade
                    ? "border-red-500/30"
                    : "border-white/10";
                  const hoverBorderColor = isDowngrade
                    ? "hover:border-red-500/50"
                    : "hover:border-white/20";
                  const statusColor = isDowngrade
                    ? "text-red-400 bg-red-500/10 border-red-500/30"
                    : "text-green-400 bg-green-500/10 border-green-500/30";

                  return (
                    <div
                      key={rec.toolId}
                      className={`bg-[#0A0A0A] border ${borderColor} rounded-2xl overflow-hidden ${hoverBorderColor} transition-colors relative`}
                    >
                      {isDowngrade && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50"></div>
                      )}
                      <div className={`p-6 ${isDowngrade ? "pl-8" : ""}`}>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center font-bold text-xl shadow-inner">
                              {rec.toolName.charAt(0)}
                            </div>
                            <div>
                              <h3 className="font-bold text-lg text-white leading-tight">
                                {rec.toolName}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {rec.currentPlanName}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full border ${statusColor} capitalize`}
                          >
                            {rec.recommendationType}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-[#050505] border border-white/5 rounded-xl p-4">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-1">
                              Current Spend
                            </p>
                            <p className="text-lg font-bold text-white">
                              ${rec.currentSpend}
                              <span className="text-xs text-gray-500 font-normal">
                                /mo
                              </span>
                            </p>
                          </div>
                          <div
                            className={
                              isDowngrade
                                ? "bg-green-500/5 border border-green-500/20 rounded-xl p-4 relative overflow-hidden"
                                : "bg-[#050505] border border-white/5 rounded-xl p-4"
                            }
                          >
                            <p
                              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDowngrade ? "text-green-500/70 relative z-10" : "text-gray-600"}`}
                            >
                              Savings
                            </p>
                            <p
                              className={`text-lg font-bold ${isDowngrade ? "text-green-400 relative z-10" : "text-gray-500"}`}
                            >
                              {isDowngrade ? `$${rec.savings}` : "—"}
                              {isDowngrade && (
                                <span className="text-xs font-normal">/mo</span>
                              )}
                            </p>
                          </div>
                          <div
                            className={
                              isDowngrade
                                ? "bg-green-500/5 border border-green-500/20 rounded-xl p-4 relative overflow-hidden"
                                : "bg-[#050505] border border-white/5 rounded-xl p-4"
                            }
                          >
                            <p
                              className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isDowngrade ? "text-green-500/70 relative z-10" : "text-gray-600"}`}
                            >
                              Annual
                            </p>
                            <p
                              className={`text-lg font-bold ${isDowngrade ? "text-green-400 relative z-10 drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" : "text-gray-500"}`}
                            >
                              {isDowngrade ? `$${rec.savings * 12}` : "—"}
                            </p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-200 font-medium mb-3">
                          {rec.recommendedAction}
                        </p>

                        <button
                          onClick={() => toggleReason(rec.toolId)}
                          className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition-colors"
                        >
                          See reasoning{" "}
                          <ChevronDown
                            className={`w-3 h-3 transition-transform ${expandedReason === rec.toolId ? "rotate-180" : ""}`}
                          />
                        </button>

                        {expandedReason === rec.toolId && (
                          <div className="mt-4 pt-4 border-t border-white/5 text-sm text-gray-400 animate-in fade-in slide-in-from-top-2">
                            {rec.reasoning}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

                        {auditData.totalMonthlySavings === 0 && (
              <div className="bg-[#050505] border border-green-500/30 rounded-2xl p-6 flex gap-4 relative overflow-hidden mt-4 group hover:border-green-500/50 transition-colors">
                <div className="absolute inset-0 bg-linear-to-r from-green-500/10 to-transparent opacity-50"></div>
                <div className="relative z-10 mt-1">
                  <Sparkles className="w-5 h-5 text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                </div>
                <div className="relative z-10">
                  <h3 className="font-bold text-green-400 mb-1">
                    You're spending well
                  </h3>
                  <p className="text-sm text-gray-400">
                    We didn't find major savings since your stack looks
                    right-sized. We'll notify you when new optimizations apply.
                  </p>
                </div>
              </div>
            )}
          </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-4">Share your audit</h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-[#050505] border border-white/10 rounded-lg px-3 py-2.5 text-xs text-gray-400 truncate overflow-hidden">
                  {window.location.origin}?audit={auditData.id}
                </div>
                <button
                  onClick={handleCopy}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 p-2.5 rounded-lg text-gray-400 hover:text-white transition-colors flex items-center justify-center min-w-[36px]"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              <button
                onClick={handleShareX}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-white/10 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <FaXTwitter className="w-4 h-4" />
                Share on X
              </button>
            </div>
                        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/5 blur-[30px] rounded-full group-hover:bg-green-500/10 transition-colors"></div>
              <h3 className="font-bold text-white mb-2 relative z-10">
                Stay in the loop
              </h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed relative z-10">
                We'll email a copy + notify you when new optimizations apply.
              </p>
              <div className="relative mb-3 z-10">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@startup.com"
                  disabled={emailLoading || emailSuccess}
                  className="w-full bg-[#050505] border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-green-500/50 disabled:opacity-50"
                />
              </div>
              <button
                onClick={handleNotify}
                disabled={emailLoading || emailSuccess || !email}
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2.5 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] disabled:opacity-50 disabled:hover:shadow-none relative z-10 text-sm"
              >
                {emailLoading
                  ? "Sending..."
                  : emailSuccess
                    ? "Sent!"
                    : "Notify me"}
              </button>
            </div>
          </div>
        </div>
      </main>

            <Footer />
    </div>
  );
}
