import { useCallback, useEffect, useRef, useState } from 'react';
import IntroSequence from './components/IntroSequence';
import Menu from './components/Menu';

import folksongUrl from './assets/folksong.mp4?url';

function fadeVolumeUp(el, target = 0.3) {
  el.muted = false;
  const step = () => {
    const next = Math.min(target, (el.volume || 0) + 0.05);
    el.volume = next;
    if (next < target) requestAnimationFrame(step);
  };
  el.volume = Math.min(el.volume || 0, 0.02);
  requestAnimationFrame(step);
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio(folksongUrl);
    a.loop = true;
    a.preload = 'auto';
    audioRef.current = a;
    let hintTimer = null;

    const tryPlayQuietAudible = async () => {
      a.muted = false;
      a.volume = 0.02;
      try {
        await a.play();
        return true;
      } catch {
        return false;
      }
    };

    const tryPlayMuted = async () => {
      a.muted = true;
      a.volume = 0;
      try {
        await a.play();
        return true;
      } catch {
        return false;
      }
    };

    const runBootstrap = async () => {
      let ok = await tryPlayQuietAudible();
      if (!ok) ok = await tryPlayMuted();
      if (!ok) return;
      hintTimer = window.setTimeout(() => {
        fadeVolumeUp(a, 0.3);
      }, 500);
    };

    void runBootstrap();

    /* No visible UI: first gesture attempts unlock; stops listening after first try */
    let unlockTried = false;
    const silentUnlock = () => {
      if (unlockTried) return;
      unlockTried = true;
      window.removeEventListener('pointerdown', silentUnlock, opts);
      window.removeEventListener('touchstart', silentUnlock, opts);
      window.removeEventListener('click', silentUnlock, opts);
      const el = audioRef.current;
      if (!el) return;
      el.muted = false;
      el.volume = Math.max(el.volume, 0.02);
      el.play()
        .then(() => fadeVolumeUp(el, 0.3))
        .catch(() => {});
    };

    const opts = { capture: true, passive: true };
    window.addEventListener('pointerdown', silentUnlock, opts);
    window.addEventListener('touchstart', silentUnlock, opts);
    window.addEventListener('click', silentUnlock, opts);

    const onVis = () => {
      if (document.visibilityState === 'visible') {
        const el = audioRef.current;
        if (el && el.paused) void el.play().then(() => fadeVolumeUp(el, 0.3)).catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      if (hintTimer) clearTimeout(hintTimer);
      window.removeEventListener('pointerdown', silentUnlock, opts);
      window.removeEventListener('touchstart', silentUnlock, opts);
      window.removeEventListener('click', silentUnlock, opts);
      document.removeEventListener('visibilitychange', onVis);
      a.pause();
      a.src = '';
      audioRef.current = null;
    };
  }, []);

  const finishIntro = useCallback(() => {
    const el = audioRef.current;
    if (el) {
      el.muted = false;
      el.play().catch(() => {});
      if (el.volume < 0.2) fadeVolumeUp(el, 0.3);
    }
    setIntroDone(true);
  }, []);

  return (
    <div className="min-h-screen font-serif text-ink relative overflow-hidden bg-transparent">
      {!introDone && <IntroSequence onComplete={finishIntro} audioRef={audioRef} />}
      <Menu introComplete={introDone} />
    </div>
  );
}

export default App;
