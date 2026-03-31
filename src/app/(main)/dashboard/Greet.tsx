"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { TypewriterEffect } from "@/components/TypeWriterEffect";

interface SmartGreetingProps {
  userName?: string;
}

export default function SmartGreeting({ userName = "there" }: SmartGreetingProps) {
  const [greeting, setGreeting] = useState<
    { text: string; className?: string }[]
  >([]);
  const [isTyping, setIsTyping] = useState(true);


  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const response = await fetch("/api/greet");

        const text = await response.text(); // ✅ FIX

        setGreeting(
          text.trim().split(/\s+/).map((word) => ({
            text: word,
          }))
        );
        setIsTyping(false);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error(err);
      }
    };

    fetchGreeting();
  }, []);
  console.log(greeting);
  

  return (
    <div className="mb-8 p-6 bg-linear-to-l from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700 text-white relative overflow-hidden">

      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles size={100} />
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-3 flex items-center gap-2 text-slate-100">
          Welcome back, {userName}!
        </h1>

        <div className="min-h-12">
          
        </div>
      </div>
    </div>
  );
}