import { useCallback, useState } from 'react';
import IntroSequence from './components/IntroSequence';
import Menu from './components/Menu';

function App() {
  const [introDone, setIntroDone] = useState(false);
  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <div className="min-h-screen bg-vintage font-serif text-ink relative overflow-hidden">
      {!introDone && <IntroSequence onComplete={finishIntro} />}
      <Menu introComplete={introDone} />
    </div>
  );
}

export default App;
