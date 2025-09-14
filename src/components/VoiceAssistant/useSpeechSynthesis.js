export default function useSpeechSynthesis() {
  const supported = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  function speak(text, { rate = 1, pitch = 1 } = {}) {
    if (!supported || !text) return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate; 
    u.pitch = pitch;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  return { supported, speak, get speaking() { return window.speechSynthesis?.speaking; } };
}