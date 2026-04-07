import { useCallback, useState } from 'react';
import IntroSequence from './components/IntroSequence';
import Menu from './components/Menu';

const INTRO_SEEN_KEY = 'retrorest-cinematic-intro-seen';

function App() {
  const [introDone, setIntroDone] = useState(() => {
    try {
      return localStorage.getItem(INTRO_SEEN_KEY) === '1';
    } catch {
      return false;
    }
  });
  const finishIntro = useCallback(() => {
    try {
      localStorage.setItem(INTRO_SEEN_KEY, '1');
    } catch {
      /* private mode etc. */
    }
    setIntroDone(true);
  }, []);

  return (
    <div className="min-h-screen bg-vintage font-serif text-ink relative overflow-hidden">
      {!introDone && <IntroSequence onComplete={finishIntro} />}
      <Menu introComplete={introDone} />
    </div>
  );
}

export default App;
