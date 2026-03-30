"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface SmartGreetingProps {
  userName?: string;

}

export default function SmartGreeting({ userName = "there" }: SmartGreetingProps) {
  const [greeting, setGreeting] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    // 1. Define the async function to fetch and read the stream
    const fetchGreeting = async () => {
      try {
        // Make sure this path matches where you saved your GET route!
        // e.g., src/app/api/greeting/route.ts
        const response = await fetch("/api/greet");
        
        if (!response.body) throw new Error("No response body");

        // 2. Set up the reader and decoder to parse the incoming text stream
        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        setIsTyping(true);

        // 3. Loop through the stream chunks as they arrive from Mistral
        while (true) {
          const { done, value } = await reader.read();
          
          if (done) {
            setIsTyping(false);
            break;
          }

          // Decode the chunk and append it to our state
          const chunkText = decoder.decode(value, { stream: true });
          setGreeting((prev) => prev + chunkText);
        }
      } catch (error) {
        console.error("Failed to fetch greeting:", error);
        setGreeting("Welcome back! Ready to chat with your documents?");
        setIsTyping(false);
      }
    };

    // 4. Trigger the fetch when the dashboard loads
    fetchGreeting();
  }, []);

  return (
    <div className="mb-8 p-6 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl shadow-lg border border-slate-700 text-white relative overflow-hidden">
      
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <Sparkles size={100} />
      </div>

      <div className="relative z-10">
        <h1 className="text-2xl font-bold mb-3 flex items-center gap-2 text-slate-100">
          Welcome back, {userName}!
        </h1>
        
        <div className="min-h-[3rem]">
          {greeting === "" && isTyping ? (
            // The pulsing loading state before the stream starts
            <div className="flex gap-1 items-center h-full">
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
              <span className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
          ) : (
            // The typing text
            <p className="text-blue-100 text-lg leading-relaxed">
              <Sparkles className="inline-block w-5 h-5 text-blue-400 mr-2 mb-1" />
              {greeting}
              {/* Optional: A blinking cursor effect while typing */}
              {isTyping && <span className="inline-block w-2 h-4 ml-1 bg-blue-400 animate-pulse" />}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}