import { getAudioCtx } from "./SoundEffects.js";

let audioElem = null;
let trackSrc = null;
let trackGain = null;

export function startBackgroundTrack() {
  if (typeof window === "undefined") {
    return;
  }
  
  const ctx = getAudioCtx();

  if (!audioElem) {
    audioElem = new Audio("/WebAudio/AudioFiles/theme_song2.mp3");
    audioElem.loop = true;

    trackSrc = ctx.createMediaElementSource(audioElem);
    trackGain = ctx.createGain();
    trackGain.gain.value = 0.125;

    trackSrc.connect(trackGain).connect(ctx.destination);
  }
  audioElem.currentTime = 0;
  audioElem.play();

}
export function stopBackgroundTrack() {
    if(!audioElem) {
        return;
    }
    audioElem.pause();
}