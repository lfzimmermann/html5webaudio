let audioCtx = null;
export class Oscillator {
  constructor(ctx, freq, type, offset) {
    this.osc = ctx.createOscillator();
    this.osc.frequency.setValueAtTime(freq.toString(), ctx.currentTime);
    this.osc.type = type;
    this.offset = offset;
  }
}

export class WhiteNoiseOscillator {
  constructor(ctx, offset, duration) {
    this.ctx = ctx;
    this.offset = offset;
    this.duration = 1;
    this.osc = null;
    this.buffer = this.generateWhiteNoise(ctx, duration);
    this.osc = ctx.createBufferSource();
    this.osc.buffer = this.buffer;
  }

  generateWhiteNoise(ctx, duration) {
    const bufferLength = ctx.sampleRate * duration;
    const audioBuffer = ctx.createBuffer(1, bufferLength, ctx.sampleRate);
    const data = audioBuffer.getChannelData(0);

    for (let i = 0; i < bufferLength; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    return audioBuffer;
  }
}

export class SoundEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.oscList = [];
    this.gain = this.ctx.createGain();
  }

};
export function getAudioCtx() {
  if(!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export class SoundEffectClick extends SoundEffect {
  constructor(ctx) {
    super(ctx);
    const osc1 = new Oscillator(audioCtx, 400, "sine", 0);
    const osc2 = new Oscillator(audioCtx, 600, "sine", 0.06);

    this.oscList.push(osc1, osc2);
    this.gain.gain.value = 1;
    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(this.ctx.currentTime + osc.offset);
      osc.osc.stop(this.ctx.currentTime + 1);
    });

    this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.2);
  }
}

// Todo: SoundEffektError für Fehlermeldung und ungewollte Aktionen z.B. bei Registerierung oder Login
export class SoundEffectError extends SoundEffect {
  constructor(ctx) {
    super(ctx);
    const osc1 = new Oscillator(audioCtx, 523.25, "sawtooth", 0);
    const osc2 = new Oscillator(audioCtx, 349.23, "square", 0.1);
    const osc3 = new Oscillator(audioCtx, 293.66, "square", 0.2);
    const osc4 = new Oscillator(audioCtx, 523.25, "square", 0.3);
    const osc5 = new Oscillator(audioCtx, 349.23, "square", 0.4);
    const osc6 = new Oscillator(audioCtx, 293.66, "square", 0.5);

    this.oscList.push(osc1, osc2, osc3, osc4, osc5, osc6);
    this.gain.gain.value = 1;
    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(this.ctx.currentTime + osc.offset);
      osc.osc.stop(this.ctx.currentTime + osc.offset + 0.2);
    });
    
    this.gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.7);
  }
}
// Done: SoundEffektClickNav (Swish) für NavButtons clicken
export class SoundEffectClickNav extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const noise1 = new WhiteNoiseOscillator(ctx, 0, 0.4);


    this.oscList.push(noise1);
    this.gain.gain.value = 0.001;
    
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(500, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(4000, this.ctx.currentTime + 0.4);

    this.oscList.forEach(osc => {
      osc.osc.connect(filter).connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(this.ctx.currentTime + osc.offset);
      osc.osc.stop(this.ctx.currentTime + 0.4);
    });
    
    this.gain.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
    this.gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);
  }
}
// ToDo: SoundEffektClickCard für Karten anclicken
export class SoundEffectCardOpen extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const osc1 = new Oscillator(ctx, 523.25, "sine", 0);
    const osc2 = new Oscillator(ctx, 783.99, "sine", 0.05);

    this.oscList.push(osc1, osc2);
    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(this.ctx.currentTime + osc.offset);
      osc.osc.stop(this.ctx.currentTime + 0.18);
    });

    this.gain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 0.02);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
  }
}

// ToDo: SoundEffektCloseCard für Kartenansicht schließen
export class SoundEffectCardClose extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const osc1 = new Oscillator(ctx, 783.99, "sine", 0);
    const osc2 = new Oscillator(ctx, 523.25, "sine", 0.04);

    this.oscList.push(osc1, osc2);
    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(this.ctx.currentTime + osc.offset);
      osc.osc.stop(this.ctx.currentTime + 0.14);
    });

    this.gain.gain.linearRampToValueAtTime(0.10, this.ctx.currentTime + 0.02);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
  }
}

// ToDo: SoundEffektClickOpenPack für openPackButton clciken
export class SoundEffectCardOpenPack extends SoundEffect {
  constructor(ctx, out) {
    super(ctx, out);

    const osc1 = new Oscillator(ctx, 523.25, "triangle", 0);
    const osc2 = new Oscillator(ctx, 659.25, "triangle", 0.06);
    const osc3 = new Oscillator(ctx, 783.99, "triangle", 0.12);
    const osc4 = new Oscillator(ctx, 1046.50, "triangle", 0.16);

    this.oscList.push(osc1, osc2, osc3, osc4);
    this.gain.gain.setValueAtTime(0.001, ctx.currentTime);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(ctx.currentTime + osc.offset);
      osc.osc.stop(ctx.currentTime + osc.offset + 0.25);
    });

    this.gain.gain.linearRampToValueAtTime(0.12, jetzt + 0.03);
    this.gain.gain.exponentialRampToValueAtTime(0.001, jetzt + 0.45);
  }
}

// ToDo: SoundEffektPackAnimation für Pack-Animation
export class SoundEffectAnimation extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const osc1 = new Oscillator(ctx, 392.00, "triangle", 0);
    this.oscList.push(osc1);

    osc.osc.connect(this.gain).connect(this.ctx.destination);
    osc.osc.start(this.ctx.currentTime + osc.offset);
    osc.osc.stop(this.ctx.currentTime + 0.90);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.000);
    this.gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.003);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.060);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.200);
    this.gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.203);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.260);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.360);
    this.gain.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 0.363);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.420);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.500);
    this.gain.gain.linearRampToValueAtTime(0.08, this.ctx.currentTime + 0.503);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.560);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.610);
    this.gain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 0.613);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.670);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.700);
    this.gain.gain.linearRampToValueAtTime(0.10, this.ctx.currentTime + 0.703);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.755);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.770);
    this.gain.gain.linearRampToValueAtTime(0.11, this.ctx.currentTime + 0.773);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.825);

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.835);
    this.gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.838);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.890);
  }
}

export class SoundEffectRevealHaeufig extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const osc1 = new Oscillator(ctx, 523.25, "triangle", 0.90);
    const osc2 = new Oscillator(ctx, 659.25, "triangle", 0.98);

    this.oscList.push(osc1, osc2);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(ctx.currentTime + osc.offset);
      osc.osc.stop(ctx.currentTime + osc.offset + 1.36);
    });

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.90);
    this.gain.gain.linearRampToValueAtTime(0.10, this.ctx.currentTime + 0.91);
    this.gain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 1.06);

    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.35);
  }
}

export class SoundEffectRevealUngewoehnlich extends SoundEffect {
  constructor(ctx) {
    super(ctx);
    const jetzt = this.ctx.currentTime;

    const osc1 = new Oscillator(ctx, 523.25, "triangle", 0.90);
    const osc2 = new Oscillator(ctx, 659.25, "triangle", 0.98);
    const osc3 = new Oscillator(ctx, 783.99, "triangle", 1.06);

    this.oscList.push(osc1, osc2, osc3);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(ctx.currentTime + osc.offset);
      osc.osc.stop(ctx.currentTime + osc.offset + 1.61);
    });

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.90);
    this.gain.gain.linearRampToValueAtTime(0.10, this.ctx.currentTime + 0.91);
    this.gain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 1.06);

    this.gain.gain.exponentialRampToValueAtTime(0.055, this.ctx.currentTime + 1.14);

    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.60);
  }
}

export class SoundEffectRevealSelten extends SoundEffect {
  constructor(ctx) {
    super(ctx);
    const jetzt = this.ctx.currentTime;

    const osc1 = new Oscillator(ctx, 523.25, "triangle", 0.90);
    const osc2 = new Oscillator(ctx, 659.25, "triangle", 0.98);
    const osc3 = new Oscillator(ctx, 783.99, "triangle", 1.06);
    const osc4 = new Oscillator(ctx, 1046.50, "triangle", 1.14);

    this.oscList.push(osc1, osc2, osc3, osc4);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(ctx.currentTime + osc.offset);
      osc.osc.stop(ctx.currentTime + osc.offset + 1.86);
    });

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime + 0.90);
    this.gain.gain.linearRampToValueAtTime(0.10, this.ctx.currentTime + 0.91);
    this.gain.gain.exponentialRampToValueAtTime(0.07, this.ctx.currentTime + 1.06);

    this.gain.gain.exponentialRampToValueAtTime(0.055, this.ctx.currentTime + 1.14);

    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.85);
  }
}

export class SoundEffectRevealLegendaer extends SoundEffectRevealSelten {
  constructor(ctx) {
    super(ctx);

    const Bass = this.ctx.createGain();
    Bass.gain.setValueAtTime(0.001, this.ctx.currentTime + 2.00);
    Bass.gain.linearRampToValueAtTime(0.30, this.ctx.currentTime + 2.01);
    Bass.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 2.70);
    Bass.connect(this.ctx.destination);

    const Pitch = this.ctx.createGain();
    Pitch.gain.setValueAtTime(0.001, this.ctx.currentTime + 2.00);
    Pitch.gain.linearRampToValueAtTime(0.07, this.ctx.currentTime + 2.06);
    Pitch.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 3.50);

    const Shimmer = this.ctx.createOscillator();
    Shimmer.frequency.value = 7;
    const deepShimmer = this.ctx.createGain();
    deepShimmer.gain.value = 0.025;
    Shimmer.connect(deepShimmer).connect(Pitch.gain);
    Shimmer.start(this.ctx.currentTime + 2.00);
    Shimmer.stop(this.ctx.currentTime + 3.55);

    const osc1 = new Oscillator(ctx, 70, "sine", 2.00);
    const osc2 = new Oscillator(ctx, 1318.51, "triangle", 2.00);
    const osc3 = new Oscillator(ctx, 1567.98, "triangle", 2.08);

    osc1.osc.frequency.setValueAtTime(70, this.ctx.currentTime + 2.00);
    osc1.osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 2.50);

    this.oscList.push(osc1, osc2, osc3);

    osc1.osc.connect(Bass).connect(this.ctx.destination);
    osc1.osc.start(this.ctx.currentTime + osc1.offset);
    osc1.osc.stop(this.ctx.currentTime + 2.72);

    osc2.osc.connect(Pitch).connect(this.ctx.destination);
    osc2.osc.start(this.ctx.currentTime + osc2.offset);
    osc2.osc.stop(this.ctx.currentTime + 3.52);

    osc3.osc.connect(Pitch).connect(this.ctx.destination);
    osc3.osc.start(this.ctx.currentTime + osc3.offset);
    osc3.osc.stop(this.ctx.currentTime + 3.52);
  }
}

// ToDo: SoundEffektLogIn/Reg für erfolgreicher Login & Registrierung
export class SoundEffectLogin extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const osc1 = new Oscillator(ctx, 261.63, "triangle", 0);
    const osc2 = new Oscillator(ctx, 329.63, "triangle", 0.09);
    const osc3 = new Oscillator(ctx, 392.00, "triangle", 0.18);

    this.oscList.push(osc1, osc2, osc3);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(ctx.currentTime + osc.offset);
      osc.osc.stop(ctx.currentTime + osc.offset + 1.36);
    });

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 0.03);
    this.gain.gain.setValueAtTime(0.09, this.ctx.currentTime + 0.16);

    this.gain.gain.linearRampToValueAtTime(0.12, this.ctx.currentTime + 0.24);
    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.70);

    const osc4 = new Oscillator(ctx, 783.99, "sine", 0.18);

    this.oscList.push(osc4);

    osc4.osc.connect(this.gain).connect(this.ctx.destination);
    osc4.osc.start(this.ctx.currentTime + osc4.offset);
    osc4.osc.stop(this.ctx.currentTime + 0.72);
  }
}

// ToDo: SoundEffektLogout für erfolgreichen Logout
export class SoundEffectLogout extends SoundEffect {
  constructor(ctx) {
    super(ctx);

    const osc1 = new Oscillator(ctx, 392.00, "sine", 0);
    const osc2 = new Oscillator(ctx, 329.63, "sine", 0.09);
    const osc3 = new Oscillator(ctx, 261.63, "sine", 0.18);
    const osc4 = new Oscillator(ctx, 130.81, "sine", 0.18);

    this.oscList.push(osc1, osc2, osc3, osc4);

    this.oscList.forEach(osc => {
      osc.osc.connect(this.gain).connect(this.ctx.destination);
      osc.osc.start(ctx.currentTime + osc.offset);
      osc.osc.stop(ctx.currentTime + osc.offset + 1.36);
    });

    this.gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.gain.gain.linearRampToValueAtTime(0.09, this.ctx.currentTime + 0.03);

    this.gain.gain.setValueAtTime(0.09, this.ctx.currentTime + 0.26);

    this.gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.77);
  }
}