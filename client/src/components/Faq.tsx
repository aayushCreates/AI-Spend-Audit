import { ChevronDown } from "lucide-react";
import { useState } from "react";


export default function FAQItem({ question, answer }: { question: string; answer: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#0A0A0A] mb-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between text-left focus:outline-none"
            >
                <span className="font-medium text-sm sm:text-base text-gray-200">{question}</span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                        }`}
                />
            </button>
            {isOpen && (
                <div className="px-6 pb-4 text-sm text-gray-400 leading-relaxed">
                    {answer}
                </div>
            )}
        </div>
    );
};