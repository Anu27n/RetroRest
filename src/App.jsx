import { useCallback, useEffect, useRef, useState } from 'react';
import GrievanceMenu from './components/GrievanceMenu';
import IntroSequence from './components/IntroSequence';
import Menu from './components/Menu';

import folksongUrl from './assets/folksong.mp4?url';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio(folksongUrl);
    a.loop = true;
    a.preload = 'auto';
    a.volume = 0.3;
    a.muted = false;
    audioRef.current = a;
    return () => {
      a.pause();
      a.src = '';
      audioRef.current = null;
    };
  }, []);

  const finishIntro = useCallback(() => {
    audioRef.current?.play().catch(() => {});
    setIntroDone(true);
  }, []);

  return (
    <div className="min-h-screen font-serif text-ink relative overflow-hidden bg-transparent">
      {!introDone && <IntroSequence onComplete={finishIntro} audioRef={audioRef} />}
      <GrievanceMenu visible={introDone} />
      <Menu introComplete={introDone} />
    </div>
  );
}

export default App;
