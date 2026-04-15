"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Sparkles, X, Send, MessageCircle } from "lucide-react";

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
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="inline-block h-2 w-2 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="inline-block h-2 w-2 rounded-full bg-ink-muted animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const handleOpen = () => {
    setOpen(true);
    if (!hasOpened) {
      setHasOpened(true);
    }
  };

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

  const suggestions = ["Best dining perks", "Unused benefits", "Compare my cards"];

  return (
    <>
      {/* Expanded chat popup */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-h-[500px] flex flex-col rounded-2xl bg-surface shadow-2xl border border-border/60 transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-dark px-4 py-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary-light" />
            <span className="text-sm font-semibold text-white font-heading">
              Perk Advisor
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0" style={{ maxHeight: "350px" }}>
          {/* Welcome message */}
          <div className="flex gap-2">
            <div className="flex-shrink-0 mt-1">
              <div className="h-6 w-6 rounded-full bg-primary-subtle flex items-center justify-center">
                <Sparkles className="h-3 w-3 text-primary" />
              </div>
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-surface-alt px-3 py-2 text-sm text-ink-secondary leading-relaxed">
              Hi! I&apos;m your Perk Advisor. Ask me anything about your perks, benefits, or which providers are right for you.
            </div>
          </div>

          {/* Suggestions (only if no messages yet) */}
          {messages.length === 0 && (
            <div className="flex flex-wrap gap-2 pl-8">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-primary/20 bg-primary-subtle px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Chat messages */}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "gap-2"}`}>
              {msg.role === "advisor" && (
                <div className="flex-shrink-0 mt-1">
                  <div className="h-6 w-6 rounded-full bg-primary-subtle flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-primary" />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-tr-sm bg-primary text-white"
                    : "rounded-tl-sm bg-surface-alt text-ink-secondary"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex gap-2">
              <div className="flex-shrink-0 mt-1">
                <div className="h-6 w-6 rounded-full bg-primary-subtle flex items-center justify-center">
                  <Sparkles className="h-3 w-3 text-primary" />
                </div>
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-surface-alt">
                <TypingIndicator />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Footer link */}
        <div className="border-t border-border/60 px-4 py-2 text-center">
          <Link
            href="/advisor"
            className="text-xs font-medium text-primary hover:text-primary-light transition-colors"
          >
            Open full advisor &rarr;
          </Link>
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 border-t border-border/60 px-3 py-3 rounded-b-2xl"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your perks..."
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white transition-colors hover:bg-primary-light disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={open ? () => setOpen(false) : handleOpen}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg hover:bg-primary-light transition-all duration-300 ${
          !hasOpened ? "animate-pulse" : ""
        }`}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <MessageCircle className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
