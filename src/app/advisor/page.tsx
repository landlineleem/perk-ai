"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send } from "lucide-react";

interface Message {
  role: "user" | "advisor";
  text: string;
}

function getDemoResponse(message: string): string {
  const lower = message.toLowerCase();
  if (/dining|food|restaurant/.test(lower)) {
    return "Based on popular dining perks, the Amex Gold card offers 4X points at restaurants worldwide \u2014 one of the best dining rewards available. Chick-fil-A and Panera Bread also have free loyalty rewards worth checking out.";
  }
  if (/unused|missing|not using/.test(lower)) {
    return "Many cardholders miss credits that reset annually. For example, the Amex Platinum has a $200 airline fee credit and $200 hotel credit that expire each year. Check your My Perks dashboard to see what you might be leaving on the table.";
  }
  if (/compare|which card|best card/.test(lower)) {
    return "It depends on your spending! For dining, Amex Gold wins with 4X points. For travel, Chase Sapphire Reserve offers excellent lounge access and travel credits. Head to My Perks to see a side-by-side of what each card gives you.";
  }
  if (/overlap|duplicate|paying twice/.test(lower)) {
    return "Great question! A common overlap is DoorDash/delivery credits \u2014 some cards like Chase Sapphire Reserve and Amex Gold both offer delivery perks. If you have both, you might be paying for redundant benefits.";
  }
  return "That\u2019s a great question! Once I\u2019m fully connected, I\u2019ll be able to give you personalized advice based on your specific cards and subscriptions. For now, check out the Browse Perks page to explore what\u2019s available.";
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-1 py-1">
      <span className="inline-block h-2 w-2 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "0ms" }} />
      <span className="inline-block h-2 w-2 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "150ms" }} />
      <span className="inline-block h-2 w-2 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "300ms" }} />
    </div>
  );
}

const suggestedQuestions = [
  "What are the best dining perks?",
  "Which travel benefits am I missing?",
  "Do any of my perks overlap?",
  "What is the Amex Platinum worth?",
  "Best free loyalty programs",
  "How do I maximize my credit card benefits?",
];

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getDemoResponse(text);
      setMessages((prev) => [...prev, { role: "advisor", text: response }]);
      setTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-cream">
      {/* Header */}
      <div className="bg-dark px-6 py-12 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-primary-light" />
            <h1 className="font-display text-2xl font-bold text-white">
              Perk Advisor
            </h1>
          </div>
          <p className="text-sm text-white/60">
            AI-powered insights for your perks and benefits
          </p>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-1 flex-col mx-auto w-full max-w-3xl px-6">
        <div className="flex-1 py-8">
          {!hasMessages ? (
            /* Welcome state */
            <div className="flex flex-col items-center justify-center py-12">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-subtle">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 font-display text-xl font-semibold text-ink">
                How can I help you today?
              </h2>
              <p className="mb-8 max-w-md text-center text-sm text-ink-muted">
                Ask me about your perks, compare providers, or discover benefits you might be missing.
              </p>
              <div className="grid w-full max-w-lg grid-cols-2 gap-3">
                {suggestedQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="rounded-2xl border border-border bg-surface p-4 text-left text-sm text-ink-secondary transition-all hover:border-primary/30 hover:bg-primary-subtle hover:text-primary"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages */
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] ${msg.role === "advisor" ? "" : ""}`}>
                    <div className={`mb-1 text-xs font-medium ${msg.role === "user" ? "text-right text-ink-muted" : "text-ink-muted"}`}>
                      {msg.role === "advisor" && (
                        <span className="inline-flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-primary" />
                          Perk Advisor
                        </span>
                      )}
                      {msg.role === "user" && "You"}
                    </div>
                    <div
                      className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-tr-sm bg-primary text-white"
                          : "rounded-tl-sm bg-surface border border-border/60 text-ink-secondary shadow-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div>
                    <div className="mb-1 text-xs font-medium text-ink-muted">
                      <span className="inline-flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        Perk Advisor
                      </span>
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-surface border border-border/60 px-4 py-3 shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="sticky bottom-0 bg-cream border-t border-border/60 py-4">
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3 shadow-sm focus-within:border-primary/40 transition-colors"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your perks, benefits, or providers..."
              className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-light disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
