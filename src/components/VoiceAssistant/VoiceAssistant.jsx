import { useState } from "react";
import ChatWindow from "./ChatWindow";
import useSpeechRecognition from "./useSpeechRecognition";

export default function VoiceAssistant() {
  const [open, setOpen] = useState(false);
  const { transcript } = useSpeechRecognition();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-full shadow-lg p-4 bg-blue-600 text-white hover:bg-blue-700 transition"
        aria-label="Open voice assistant"
      >
        🎤
      </button>

      {open && <ChatWindow onClose={() => setOpen(false)} transcript={transcript} />}
    </div>
  );
}