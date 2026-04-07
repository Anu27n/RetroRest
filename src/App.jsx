import { useCallback, useEffect, useRef, useState } from 'react';
import IntroSequence from './components/IntroSequence';
import Menu from './components/Menu';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const a = new Audio('/audio/folksong.mp4');
    a.volume = 0.3;
    a.loop = true;
    audioRef.current = a;
    return () => { a.pause(); a.src = ''; };
  }, []);

  const finishIntro = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-vintage font-serif text-ink relative overflow-hidden">
      {!introDone && <IntroSequence onComplete={finishIntro} audioRef={audioRef} />}
      <Menu introComplete={introDone} />
    </div>
  );
}

export default App;
