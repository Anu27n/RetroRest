import { useCallback, useEffect, useRef, useState } from 'react';
import IntroSequence from './components/IntroSequence';
import Menu from './components/Menu';

function fadeVolumeUp(el, target = 0.3) {
  el.muted = false;
  const step = () => {
    const next = Math.min(target, (el.volume || 0) + 0.05);
    el.volume = next;
    if (next < target) requestAnimationFrame(step);
  };
  el.volume = 0;
  requestAnimationFrame(step);
}

function App() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio('/audio/folksong.mp4');
    a.loop = true;
    a.preload = 'auto';
    audioRef.current = a;
    let hintTimer = null;

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
      const mutedOk = await tryPlayMuted();
      if (!mutedOk) return;
      hintTimer = window.setTimeout(() => {
        fadeVolumeUp(a, 0.3);
      }, 700);
    };

    void runBootstrap();

    return () => {
      if (hintTimer) clearTimeout(hintTimer);
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
