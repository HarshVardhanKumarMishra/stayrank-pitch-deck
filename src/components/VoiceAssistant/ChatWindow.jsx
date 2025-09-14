import { useEffect, useRef, useState } from "react";
import useSpeechSynthesis from "./useSpeechSynthesis";
import useSpeechRecognition from "./useSpeechRecognition";

const API_BASE = import.meta.env.VITE_ASSISTANT_API || "http://localhost:5000";

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const { speak, speaking, supported: ttsSupported } = useSpeechSynthesis();
  const { listening, supported: sttSupported, start, stop, transcript } =
    useSpeechRecognition({ lang: "en-IN" });

  const listRef = useRef(null);
  useEffect(() => { listRef.current?.scrollTo(0, listRef.current.scrollHeight); }, [messages]);

useEffect(() => {
  if (!transcript) return;
  setInput((prev) => transcript.trim() ? transcript : prev);
}, [transcript]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content) return;

    const userMsg = { role: "user", content };
    setMessages((m) => [...m, userMsg]);
    if (text === undefined) setInput("");

    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: content })
    });
    const data = await res.json();
    const reply = data?.reply || "Sorry, I couldn't generate a reply.";

    const botMsg = { role: "assistant", content: reply };
    setMessages((m) => [...m, botMsg]);

    if (ttsSupported && !speaking) speak(reply);
  }

  return (
    <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white px-3 py-2 flex items-center justify-between">
        <span className="font-medium">StayRank Assistant</span>
        <button onClick={onClose} aria-label="Close">✖</button>
      </div>

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-2">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-2 rounded-lg whitespace-pre-wrap ${
              m.role === "user" ? "ml-auto bg-gray-200" : "mr-auto bg-blue-50"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 flex gap-2 items-stretch">
        <input
          className="flex-1 border rounded-lg p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about StayRank…"
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button onClick={() => send()} className="bg-blue-600 text-white px-3 rounded-lg">➤</button>
        <button
          onClick={() => (listening ? stop() : start())}
          className={`px-3 rounded-lg border ${listening ? "bg-red-50" : "bg-gray-50"}`}
          title={sttSupported ? "Toggle voice input" : "Voice not supported"}
          disabled={!sttSupported}
        >
          {listening ? "■" : "🎙"}
        </button>
      </div>
    </div>
  );
}