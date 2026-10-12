// Web Audio Synthesizer Engine reproducing Sibaldesign audio system

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let ambientNodes: { oscs: OscillatorNode[]; lfo: OscillatorNode } | null = null;

export function initAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);
  }
  return audioCtx;
}

/**
 * Play a high-precision futuristic micro-tone beep/chirp
 * freq: frequency in Hz
 * duration: duration in seconds
 * type: oscillator waveform
 * volume: normalized volume 0-1
 */
export function playTone(freq = 880, duration = 0.05, type: OscillatorType = 'square', volume = 0.05): void {
  try {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    filter.type = 'bandpass';
    filter.frequency.value = freq * 1.4;
    filter.Q.value = 2.2;

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.72, now + duration);

    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    if (masterGain) gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  } catch {
    // Ignore audio failures if browser blocks autoplay
  }
}

/**
 * Creates the continuous analog-synth ambient drone (tech-noir drone pad)
 */
function startAmbientDrone(): void {
  if (ambientNodes || !audioCtx || !masterGain) return;

  const droneGain = audioCtx.createGain();
  droneGain.gain.value = 0.45;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 320;
  filter.Q.value = 6;

  // Slow LFO modulating filter cutoff
  const lfo = audioCtx.createOscillator();
  lfo.frequency.value = 0.045; // very slow wave
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 190;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  // 3-Oscillator chord: 55Hz (A1), 82.5Hz (E2), 110.3Hz (A2)
  const freqs = [55, 82.5, 110.3];
  const oscs = freqs.map((freq, idx) => {
    const osc = audioCtx!.createOscillator();
    osc.type = idx === 2 ? 'triangle' : 'sawtooth';
    osc.frequency.value = freq;
    const subGain = audioCtx!.createGain();
    subGain.gain.value = idx === 2 ? 0.12 : 0.28;
    osc.connect(subGain);
    subGain.connect(filter);
    osc.start();
    return osc;
  });

  filter.connect(droneGain);
  droneGain.connect(masterGain);
  ambientNodes = { oscs, lfo };
}

export function resumeAudio(): void {
  try {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  } catch {
    // ignore
  }
}

export function setAmbienceActive(active: boolean): void {
  try {
    initAudioContext();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (active) {
      startAmbientDrone();
    }
    if (masterGain && audioCtx) {
      const now = audioCtx.currentTime;
      masterGain.gain.cancelScheduledValues(now);
      masterGain.gain.setTargetAtTime(active ? 0.32 : 0, now, 0.35);
    }
  } catch {
    // ignore
  }
}
