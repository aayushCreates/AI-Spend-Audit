import { MessageSquareQuote } from "lucide-react";
import FAQItem from "./Faq";

export default function FaqSection() {
  return (
    <section className="py-24 px-4 max-w-3xl mx-auto relative">
      <div className="space-y-1">
        <FAQItem
          question="Is my data secure?"
          answer="Yes. We don't store your sensitive usage data or credit card information. The audit is performed completely in your browser where possible, and any server processing is encrypted and immediately deleted."
        />
        <FAQItem
          question="Do you integrate with my accounting software?"
          answer="SpendLens integrates with QuickBooks, Xero, and NetSuite to automatically pull your software spend, saving you from manual entry."
        />
        <FAQItem
          question="What is the Credex integration?"
          answer="We partner with Credex to provide you with a virtual corporate card optimized for SaaS spending. This helps enforce limits and catches duplicate subscriptions before you get billed."
        />
        <FAQItem
          question="Can I export or share my audit report?"
          answer="Yes! Once your audit is complete, you can generate a shareable link or download a PDF report to present to your finance team."
        />
      </div>

      <div className="mt-8 flex justify-center">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 hover:bg-white/10 transition-colors">
          <MessageSquareQuote className="w-4 h-4 text-green-400" />
          Still have questions?{" "}
          <span className="text-green-400 font-medium">Contact us</span>
        </button>
      </div>
    </section>
  );
}
