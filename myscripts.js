class Oscillator {
  constructor(ctx, freq, type, offset) {
    this.osc = ctx.createOscillator();
    this.osc.frequency.setValueAtTime(freq, ctx.currentTime);
    this.osc.type = type;
    this.offset = offset;
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
    const osc1 = new Oscillator(audioCtx, "100", "sine", 0);
    const osc2 = new Oscillator(audioCtx, "200", "sine", 0.1);

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

// ToDo: SoundEffektClickNav für NavButtons clicken

// ToDo: SoundEffektClickCard für Karten anclicken

// ToDo: SoundEffektCloseCard für Kartenansicht schließen

// ToDo: SoundEffektClickOpenPack für openPackButton clciken

// ToDo: SoundEffektPackAnimation für Pack-Animation

// ToDo: SoundEffekteNormalCardPull für alle anderen Karten

// ToDo: SoundEffektLegendaryCardPull für legendäre Karten ziehen

// ToDo: SoundEffektLogIn/Reg für erfolgreicher Login & Registrierung

// ToDo: SoundEffektLogout für erfolgreichen Logout