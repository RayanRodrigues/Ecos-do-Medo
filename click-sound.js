"use strict";

let audioCtx;
const clickAudio = new Audio("./sounds/mouse-click-sound-effect.mp3");
clickAudio.preload = "auto";
clickAudio.volume = 0.32;

function ensureAudioContext() {
  if (!audioCtx) {
    const AudioContextRef = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextRef) return null;
    audioCtx = new AudioContextRef();
  }

  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }

  return audioCtx;
}

function playSyntheticFallback() {
  const ctx = ensureAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = "square";
  osc.frequency.setValueAtTime(2100, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.014);

  filter.type = "highpass";
  filter.frequency.setValueAtTime(700, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.055, now + 0.0025);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.025);
}

function playClickSound() {
  // Clona para permitir varios cliques consecutivos sem interromper o anterior.
  const instance = clickAudio.cloneNode();
  instance.volume = clickAudio.volume;
  instance.play().catch(() => {
    playSyntheticFallback();
  });
}

document.addEventListener(
  "pointerdown",
  (event) => {
    if (event.button !== 0) return;
    playClickSound();
  },
  { passive: true }
);
