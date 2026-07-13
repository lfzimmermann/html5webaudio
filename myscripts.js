class Oscillator {
  constructor(ctx, freq, type, offset) {
    this.osc = ctx.createOscillator();
    this.osc.frequency.setValueAtTime(freq.toString(), ctx.currentTime);
    this.osc.type = type;
    this.offset = offset;
  }
}

class WhiteNoiseOscillator {
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


class SoundEffect {
  constructor(ctx) {
    this.ctx = ctx;
    this.oscList = [];
    this.gain = this.ctx.createGain();
  }

};

class SoundEffectClick extends SoundEffect {
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
const audioCtx = new AudioContext();

// Todo: SoundEffektError für Fehlermeldung und ungewollte Aktionen z.B. bei Registerierung oder Login
class SoundEffectError extends SoundEffect {
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
class SoundEffectClickNav extends SoundEffect {
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

// ToDo: SoundEffektCloseCard für Kartenansicht schließen

// ToDo: SoundEffektClickOpenPack für openPackButton clciken

// ToDo: SoundEffektPackAnimation für Pack-Animation

// ToDo: SoundEffekteNormalCardPull für alle anderen Karten

// ToDo: SoundEffektLegendaryCardPull für legendäre Karten ziehen

// ToDo: SoundEffektLogIn/Reg für erfolgreicher Login & Registrierung

// ToDo: SoundEffektLogout für erfolgreichen Logout
