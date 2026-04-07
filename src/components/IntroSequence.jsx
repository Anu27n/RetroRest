import { useEffect, useRef, useState } from 'react';

export default function IntroSequence({ onComplete }) {
  const [phase, setPhase] = useState('window');
  const audioRef = useRef(null);
  const timersRef = useRef([]);
  const cbRef = useRef(onComplete);
  cbRef.current = onComplete;

  useEffect(() => {
    const audio = new Audio('/audio/udaipur-theme.mp3');
    audio.volume = 0.35;
    audioRef.current = audio;

    const q = (fn, ms) => {
      timersRef.current.push(setTimeout(fn, ms));
    };

    q(() => setPhase('shutters-open'), 600);
    q(() => audio.play().catch(() => {}), 700);
    q(() => setPhase('pour'), 3200);
    q(() => setPhase('exit'), 6400);
    q(() => { audio.pause(); cbRef.current?.(); }, 7400);

    return () => {
      timersRef.current.forEach(clearTimeout);
      audio.pause();
    };
  }, []);

  const shuttersOpen = phase !== 'window';
  const showPour = phase === 'pour' || phase === 'exit';
  const exiting = phase === 'exit';

  return (
    <div className={`intro ${exiting ? 'intro--exit' : ''}`} aria-hidden="true">
      <div className="intro__stage">
        {/* ─── WINDOW ─── */}
        <div className={`intro__window ${shuttersOpen ? 'intro__window--open' : ''}`}>
          <div className="intro__window-backlight" />
          <img
            className="intro__window-image"
            src="/retrowindow.png"
            alt="Vintage decorative window"
            draggable={false}
          />
          <div className="intro__shutter intro__shutter--l" />
          <div className="intro__shutter intro__shutter--r" />
          <div className="intro__rays" />
        </div>

        {/* ─── TEA POUR ─── */}
        <div className={`intro__pour ${showPour ? 'intro__pour--on' : ''}`}>
          <svg viewBox="0 0 240 140" className="intro__pour-svg">
            <defs>
              <linearGradient id="ipTea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B4423" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A67C52" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="ipLiquid" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#5C3820" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#967052" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {/* Saucer */}
            <ellipse cx="166" cy="118" rx="38" ry="8"
              fill="none" stroke="#3A2515" strokeWidth="1.8" opacity="0.5" />

            {/* Cup body */}
            <path d="M 134 66 L 134 104 Q 134 114 146 114 L 186 114 Q 198 114 198 104 L 198 66 Z"
              fill="none" stroke="#3A2515" strokeWidth="2" />
            {/* Cup handle */}
            <path d="M 198 74 Q 214 74 214 90 Q 214 106 198 104"
              fill="none" stroke="#3A2515" strokeWidth="1.8" />

            {/* Tea liquid inside cup (clip + fill) */}
            <clipPath id="ipCupClip">
              <path d="M 136 68 L 136 102 Q 136 112 148 112 L 184 112 Q 196 112 196 102 L 196 68 Z" />
            </clipPath>
            <g clipPath="url(#ipCupClip)">
              <rect className="intro__tea-fill" x="134" y="72" width="64" height="44" fill="url(#ipLiquid)" />
            </g>

            {/* Cup rim */}
            <line x1="131" y1="66" x2="201" y2="66" stroke="#3A2515" strokeWidth="2.5" strokeLinecap="round" />

            {/* Steam */}
            <g className="intro__steam" opacity="0.4">
              <path className="intro__steam-s intro__steam-s--1"
                d="M 156 54 Q 160 42 154 30 Q 150 22 156 14" fill="none" />
              <path className="intro__steam-s intro__steam-s--2"
                d="M 172 56 Q 178 44 170 30" fill="none" />
              <path className="intro__steam-s intro__steam-s--3"
                d="M 186 58 Q 192 48 184 36" fill="none" />
            </g>

            {/* Teapot body */}
            <g className="intro__pot-g">
              <ellipse cx="72" cy="94" rx="36" ry="26"
                fill="none" stroke="#3A2515" strokeWidth="2" />
              {/* Decorative band on pot */}
              <ellipse cx="72" cy="94" rx="36" ry="12"
                fill="none" stroke="#3A2515" strokeWidth="0.8" opacity="0.35" />
              {/* Spout */}
              <path d="M 104 78 Q 122 68 134 62 L 136 68 Q 122 76 106 84"
                fill="none" stroke="#3A2515" strokeWidth="1.8" />
              {/* Handle */}
              <path d="M 38 80 Q 22 80 22 96 Q 22 110 40 112"
                fill="none" stroke="#3A2515" strokeWidth="2" />
              {/* Lid */}
              <path d="M 44 70 Q 72 52 100 70"
                fill="none" stroke="#3A2515" strokeWidth="1.8" />
              {/* Knob */}
              <circle cx="72" cy="58" r="5"
                fill="none" stroke="#3A2515" strokeWidth="1.5" />
            </g>

            {/* Tea stream */}
            <path className="intro__stream"
              d="M 134 62 Q 140 78 150 96 Q 158 108 166 104"
              fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );
}
