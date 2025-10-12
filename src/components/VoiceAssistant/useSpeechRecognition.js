export default function useSpeechRecognition({ lang = "en-US" } = {}) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const supported = !!SpeechRecognition;
  let recognition;
  let listeners = {};
  let state = { listening: false, transcript: "" };

  const notify = () => listeners.onChange?.({ ...state });

  function attach() {
    if (!supported) return;
    recognition = new SpeechRecognition();
    console.log("🎤 SpeechRecognition initialized:", recognition);
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false; 

    recognition.onresult = (e) => {
      const last = e.results[e.results.length - 1];
      if (last.isFinal) {
        state.transcript = last[0].transcript.trim();
        console.log("✅ Final transcript:", state.transcript);
        notify();
      }
    };
    recognition.onstart = () => {
      console.log("🎙️ Listening started");
      state.listening = true;
      notify();
    };
    recognition.onend = () => {
      console.log("🛑 Listening ended");
      state.listening = false;
      notify();
    };
    recognition.onerror = (e) => {
      console.error("❌ Speech recognition error", e);
      state.listening = false;
      notify();
    };
  }

  if (supported && !recognition) attach();

  return {
    supported,
    get listening() { return state.listening; },
    get transcript() { return state.transcript; },
    start: () => {
      if (supported && recognition && !state.listening) {
        recognition.start();
      }
    },
    stop: () => {
      if (supported && recognition && state.listening) {
        recognition.stop();
        recognition.abort(); 
      }
    },
    clearTranscript: () => { state.transcript = ""; notify(); },
    subscribe: (fn) => { listeners.onChange = fn; return () => (listeners.onChange = null); }
  };
}