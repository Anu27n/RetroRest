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
      {/* Same aged-paper feel as the site — no dark room */}
      <div className="intro__paper" />

      <div className="intro__stage">
        {/* ─── WINDOW ─── */}
        <div className={`intro__window ${shuttersOpen ? 'intro__window--open' : ''}`}>
          <svg viewBox="0 0 260 400" className="intro__window-svg">
            <defs>
              <linearGradient id="iwWood" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#6B4C34" />
                <stop offset="50%" stopColor="#8B6B4E" />
                <stop offset="100%" stopColor="#5C3D28" />
              </linearGradient>
              <linearGradient id="iwShutterL" x1="0" y1="0" x2="1" y2="0.5">
                <stop offset="0%" stopColor="#5A3E2A" />
                <stop offset="100%" stopColor="#7A5C42" />
              </linearGradient>
              <linearGradient id="iwShutterR" x1="1" y1="0" x2="0" y2="0.5">
                <stop offset="0%" stopColor="#5A3E2A" />
                <stop offset="100%" stopColor="#7A5C42" />
              </linearGradient>
              <radialGradient id="iwLight" cx="50%" cy="40%" r="55%">
                <stop offset="0%" stopColor="#FFF5DC" stopOpacity="0.95" />
                <stop offset="55%" stopColor="#F0D9A8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#D6C2A9" stopOpacity="0" />
              </radialGradient>
              <clipPath id="iwPaneClip">
                <path d="M 42 36 A 88 55 0 0 1 218 36 L 218 362 L 42 362 Z" />
              </clipPath>
            </defs>

            {/* Outer frame — thick wooden border */}
            <path
              d="M 30 372 L 30 32 A 100 62 0 0 1 230 32 L 230 372 Z"
              fill="url(#iwWood)"
              stroke="#3A2515"
              strokeWidth="3"
            />
            {/* Inner frame edge */}
            <path
              d="M 42 362 L 42 36 A 88 55 0 0 1 218 36 L 218 362 Z"
              fill="none"
              stroke="#3A2515"
              strokeWidth="2"
            />

            {/* Pane area (warm golden light behind shutters) */}
            <g clipPath="url(#iwPaneClip)">
              <rect
                className="intro__window-light"
                x="42" y="36" width="176" height="326"
                fill="url(#iwLight)"
              />
            </g>

            {/* Mullions — vertical center + horizontal bars */}
            <g stroke="#3A2515" strokeWidth="2.5" strokeLinecap="round">
              <line x1="130" y1="38" x2="130" y2="362" />
              <line x1="42" y1="120" x2="218" y2="120" />
              <line x1="42" y1="200" x2="218" y2="200" />
              <line x1="42" y1="280" x2="218" y2="280" />
            </g>

            {/* Arch inner curve */}
            <path
              d="M 80 36 A 50 32 0 0 1 180 36"
              fill="none"
              stroke="#3A2515"
              strokeWidth="1.5"
              opacity="0.7"
            />

            {/* Wooden shutters — positioned over pane, transition via CSS */}
            <g clipPath="url(#iwPaneClip)">
              <rect
                className="intro__shutter intro__shutter--l"
                x="42" y="36" width="88" height="326"
                fill="url(#iwShutterL)"
                stroke="#3A2515"
                strokeWidth="1.5"
              />
              <rect
                className="intro__shutter intro__shutter--r"
                x="130" y="36" width="88" height="326"
                fill="url(#iwShutterR)"
                stroke="#3A2515"
                strokeWidth="1.5"
              />
              {/* Shutter planks (left) */}
              <g className="intro__shutter intro__shutter--l" opacity="0.35" stroke="#3A2515" strokeWidth="0.8">
                <line x1="42" y1="100" x2="130" y2="100" />
                <line x1="42" y1="180" x2="130" y2="180" />
                <line x1="42" y1="260" x2="130" y2="260" />
                <line x1="42" y1="340" x2="130" y2="340" />
              </g>
              {/* Shutter planks (right) */}
              <g className="intro__shutter intro__shutter--r" opacity="0.35" stroke="#3A2515" strokeWidth="0.8">
                <line x1="130" y1="100" x2="218" y2="100" />
                <line x1="130" y1="180" x2="218" y2="180" />
                <line x1="130" y1="260" x2="218" y2="260" />
                <line x1="130" y1="340" x2="218" y2="340" />
              </g>
            </g>

            {/* Frame grain lines — subtle hatch for wood feel */}
            <g stroke="#3A2515" strokeWidth="0.35" opacity="0.3">
              <line x1="32" y1="60" x2="40" y2="55" />
              <line x1="32" y1="100" x2="40" y2="96" />
              <line x1="32" y1="150" x2="40" y2="146" />
              <line x1="32" y1="210" x2="40" y2="206" />
              <line x1="32" y1="280" x2="40" y2="276" />
              <line x1="32" y1="340" x2="40" y2="336" />
              <line x1="220" y1="65" x2="228" y2="60" />
              <line x1="220" y1="110" x2="228" y2="106" />
              <line x1="220" y1="160" x2="228" y2="156" />
              <line x1="220" y1="220" x2="228" y2="216" />
              <line x1="220" y1="290" x2="228" y2="286" />
              <line x1="220" y1="345" x2="228" y2="341" />
            </g>
          </svg>

          {/* Warm light rays — only visible once shutters open */}
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
