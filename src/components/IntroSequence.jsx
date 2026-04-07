import { motion, useReducedMotion } from 'framer-motion';
import { GiCamel } from 'react-icons/gi';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

const WINDOW_HOLD_MS = 700;
const LIGHT_DELAY_MS = 220;
const TEA_DELAY_MS = 500;
const TEA_POUR_MS = 2800;
const TEA_HOLD_MS = 3800;
const EXIT_FADE_MS = 950;

export default function IntroSequence({ onComplete, audioRef }) {
  const rid = useId().replace(/:/g, '');
  const reduceMotion = useReducedMotion();

  const [lightOn, setLightOn] = useState(false);
  const [teaOn, setTeaOn] = useState(false);
  const [exiting, setExiting] = useState(false);

  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    onComplete?.();
  }, [clearTimers, onComplete]);

  const skip = useCallback(() => {
    clearTimers();
    onComplete?.();
  }, [clearTimers, onComplete]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  const queue = useCallback((fn, ms) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  useEffect(() => {
    queue(() => {
      setLightOn(true);
      audioRef.current?.play().catch(() => {});
    }, (reduceMotion ? 0 : WINDOW_HOLD_MS) + LIGHT_DELAY_MS);
    return clearTimers;
  }, [reduceMotion, queue, clearTimers, audioRef]);

  useEffect(() => {
    if (!lightOn) return;
    queue(() => setTeaOn(true), reduceMotion ? 0 : TEA_DELAY_MS);
    return clearTimers;
  }, [lightOn, reduceMotion, queue, clearTimers]);

  useEffect(() => {
    if (!teaOn) return;
    queue(() => setExiting(true), reduceMotion ? 400 : TEA_HOLD_MS);
    return clearTimers;
  }, [teaOn, reduceMotion, queue, clearTimers]);

  useEffect(() => {
    if (!exiting) return;
    queue(finish, EXIT_FADE_MS);
    return clearTimers;
  }, [exiting, finish, queue, clearTimers]);

  const ink = '#3A2515';
  const pour = reduceMotion ? 0.01 : TEA_POUR_MS / 1000;

  return (
    <motion.div
      className="intro-cin"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_FADE_MS / 1000, ease: 'easeInOut' }}
    >
      <button type="button" className="intro-cin__skip" onClick={skip}>Skip intro</button>

      <div className="intro-cin__stage">
        {/* ─── ORNATE DOOR (pure SVG, inspired by reference) ─── */}
        <div className="intro-cin__door-wrap">
          {/* Diffuse glow + hot core (behind line art) */}
          <motion.div
            className="intro-cin__glow intro-cin__glow--diffuse"
            initial={false}
            animate={{ opacity: lightOn ? 1 : 0, scale: lightOn ? 1 : 0.82 }}
            transition={{ duration: reduceMotion ? 0.01 : 1.35, ease: 'easeOut' }}
          />
          <motion.div
            className="intro-cin__glow intro-cin__glow--core"
            initial={false}
            animate={{ opacity: lightOn ? 1 : 0, scale: lightOn ? 1 : 0.9 }}
            transition={{ duration: reduceMotion ? 0.01 : 1.1, ease: 'easeOut', delay: 0.05 }}
          />

          <svg className="intro-cin__door-svg" viewBox="0 0 300 420" fill="none">
            <defs>
              <radialGradient id={`${rid}-opening`} cx="50%" cy="32%" r="72%">
                <stop offset="0%" stopColor="#fffef5" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#ffefbc" stopOpacity="0.88" />
                <stop offset="62%" stopColor="#f0d48a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e4c896" stopOpacity="0.12" />
              </radialGradient>
            </defs>
            {/* Warm light fills the window opening (visible through strokes) */}
            <motion.path
              d="M 34 392 L 34 126 A 116 108 0 0 1 266 126 L 266 392 Z"
              fill={`url(#${rid}-opening)`}
              stroke="none"
              initial={false}
              animate={{ opacity: lightOn ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: 'easeOut' }}
            />
            <path d="M 20 400 L 20 120 A 130 120 0 0 1 280 120 L 280 400 Z"
              fill="none" stroke={ink} strokeWidth="5" />
            {/* Inner arch frame */}
            <path d="M 34 392 L 34 126 A 116 108 0 0 1 266 126 L 266 392 Z"
              fill="none" stroke={ink} strokeWidth="2.5" />

            {/* Pillar columns */}
            <rect x="20" y="118" width="16" height="282" fill="none" stroke={ink} strokeWidth="1.5" />
            <rect x="264" y="118" width="16" height="282" fill="none" stroke={ink} strokeWidth="1.5" />
            <line x1="28" y1="134" x2="28" y2="395" stroke={ink} strokeWidth="0.6" opacity="0.35" />
            <line x1="272" y1="134" x2="272" y2="395" stroke={ink} strokeWidth="0.6" opacity="0.35" />

            {/* Sill / base */}
            <rect x="14" y="396" width="272" height="18" rx="2" fill="none" stroke={ink} strokeWidth="3" />
            <line x1="18" y1="405" x2="282" y2="405" stroke={ink} strokeWidth="1" opacity="0.45" />

            {/* Arch decoration — fan/sunburst in the tympanum */}
            <g stroke={ink} strokeWidth="1.2" opacity="0.7">
              <path d="M 150 50 L 150 126" />
              <path d="M 150 68 L 100 126" />
              <path d="M 150 68 L 200 126" />
              <path d="M 150 55 L 68 122" />
              <path d="M 150 55 L 232 122" />
              <path d="M 150 48 L 46 118" />
              <path d="M 150 48 L 254 118" />
            </g>
            {/* Fan centre circle */}
            <circle cx="150" cy="68" r="12" fill="none" stroke={ink} strokeWidth="1.5" />
            <circle cx="150" cy="68" r="5" fill="none" stroke={ink} strokeWidth="1" opacity="0.6" />

            {/* Scallop trim along outer arch */}
            <g stroke={ink} strokeWidth="0.9" opacity="0.55" fill="none">
              {[...Array(9)].map((_, i) => {
                const angle = Math.PI * (0.15 + i * 0.085);
                const cx = 150 - 138 * Math.cos(angle);
                const cy = 120 - 118 * Math.sin(angle);
                return <circle key={i} cx={cx} cy={cy} r="9" />;
              })}
            </g>

            {/* Horizontal transom bar separating arch from doors */}
            <line x1="34" y1="126" x2="266" y2="126" stroke={ink} strokeWidth="3.5" />

            {/* Centre vertical mullion (doors meet here) */}
            <line x1="150" y1="126" x2="150" y2="392" stroke={ink} strokeWidth="3" />

            {/* Door panel frames — left */}
            <rect x="42" y="134" width="102" height="250" rx="2" fill="none" stroke={ink} strokeWidth="1.8" />
            {/* Door panel frames — right */}
            <rect x="156" y="134" width="102" height="250" rx="2" fill="none" stroke={ink} strokeWidth="1.8" />

            {/* Inner recessed panels — left top */}
            <rect x="50" y="142" width="86" height="114" rx="3" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.75" />
            {/* Inner recessed panels — left bottom */}
            <rect x="50" y="264" width="86" height="112" rx="3" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.75" />
            {/* Inner recessed panels — right top */}
            <rect x="164" y="142" width="86" height="114" rx="3" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.75" />
            {/* Inner recessed panels — right bottom */}
            <rect x="164" y="264" width="86" height="112" rx="3" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.75" />

            {/* Decorative arched motifs inside top panels */}
            <path d="M 58 249 Q 93 190 128 249" fill="none" stroke={ink} strokeWidth="1" opacity="0.55" />
            <path d="M 66 249 Q 93 200 120 249" fill="none" stroke={ink} strokeWidth="0.7" opacity="0.4" />
            <path d="M 172 249 Q 207 190 242 249" fill="none" stroke={ink} strokeWidth="1" opacity="0.55" />
            <path d="M 180 249 Q 207 200 234 249" fill="none" stroke={ink} strokeWidth="0.7" opacity="0.4" />

            {/* Decorative arched motifs inside bottom panels */}
            <path d="M 58 369 Q 93 310 128 369" fill="none" stroke={ink} strokeWidth="1" opacity="0.55" />
            <path d="M 66 369 Q 93 320 120 369" fill="none" stroke={ink} strokeWidth="0.7" opacity="0.4" />
            <path d="M 172 369 Q 207 310 242 369" fill="none" stroke={ink} strokeWidth="1" opacity="0.55" />
            <path d="M 180 369 Q 207 320 234 369" fill="none" stroke={ink} strokeWidth="0.7" opacity="0.4" />

            {/* Door handles */}
            <g stroke={ink} strokeWidth="1.6" fill="none">
              <rect x="124" y="245" width="10" height="22" rx="2" />
              <line x1="129" y1="252" x2="129" y2="262" strokeWidth="2" />
              <rect x="166" y="245" width="10" height="22" rx="2" />
              <line x1="171" y1="252" x2="171" y2="262" strokeWidth="2" />
            </g>

            {/* Wood grain hints */}
            <g stroke={ink} strokeWidth="0.35" opacity="0.2">
              <path d="M 60 150 Q 65 200 58 260 Q 62 320 60 370" />
              <path d="M 95 148 Q 90 210 96 280 Q 92 340 94 376" />
              <path d="M 125 150 Q 130 220 124 300 Q 128 360 126 375" />
              <path d="M 175 150 Q 170 210 176 280 Q 172 340 174 376" />
              <path d="M 210 148 Q 215 200 208 260 Q 212 330 210 375" />
              <path d="M 240 150 Q 235 220 242 300 Q 238 360 240 375" />
            </g>
          </svg>

          {/* Light rays */}
          <motion.div
            className="intro-cin__rays"
            initial={false}
            animate={{ opacity: lightOn ? 1 : 0, scaleY: lightOn ? 1 : 0.12 }}
            transition={{ duration: reduceMotion ? 0.01 : 1.45, ease: 'easeOut', delay: 0.06 }}
          />

          <motion.div
            className="intro-cin__camel intro-cin__camel--left"
            initial={false}
            animate={reduceMotion ? { opacity: 0.65 } : { x: [0, -8, 0, 8, 0], y: [0, -2, 0, -2, 0], rotate: [0, -2, 0, 2, 0], opacity: [0.55, 0.75, 0.75, 0.75, 0.55] }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 2.7, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            <GiCamel className="intro-cin__camel-icon" />
          </motion.div>

          <motion.div
            className="intro-cin__camel intro-cin__camel--right"
            initial={false}
            animate={reduceMotion ? { opacity: 0.65 } : { x: [0, 8, 0, -8, 0], y: [0, -2, 0, -2, 0], rotate: [0, 2, 0, -2, 0], opacity: [0.55, 0.75, 0.75, 0.75, 0.55] }}
            transition={reduceMotion ? { duration: 0.01 } : { duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
            aria-hidden
          >
            <GiCamel className="intro-cin__camel-icon" />
          </motion.div>
        </div>

        {/* ─── TEA: custom vintage teapot (inspired by reference), masked chai drains as cup fills ─── */}
        <motion.div
          className="intro-cin__tea intro-cin__tea--retro"
          initial={false}
          animate={{ opacity: teaOn ? 1 : 0, y: teaOn ? 0 : 16 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 400 210" className="intro-cin__tea-svg" aria-hidden>
            <defs>
              <radialGradient id={`${rid}-potChai`} cx="42%" cy="40%" r="68%">
                <stop offset="0%" stopColor="#c99548" stopOpacity="0.92" />
                <stop offset="55%" stopColor="#8b5425" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#5c3618" stopOpacity="0.85" />
              </radialGradient>
              <linearGradient id={`${rid}-stream`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#a06830" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#6b3e1a" stopOpacity="0.55" />
              </linearGradient>
              <linearGradient id={`${rid}-cupChai`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#5c3618" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#b07a3c" stopOpacity="0.55" />
              </linearGradient>
              <clipPath id={`${rid}-potBody`}>
                <ellipse cx="96" cy="106" rx="35" ry="33" />
              </clipPath>
              <mask id={`${rid}-potLevel`} maskUnits="userSpaceOnUse">
                <rect x="0" y="0" width="400" height="220" fill="black" />
                <motion.rect
                  fill="white"
                  rx="10"
                  ry="10"
                  initial={{ x: 52, y: 44, width: 88, height: 96 }}
                  animate={
                    teaOn
                      ? reduceMotion
                        ? { x: 52, y: 122, width: 88, height: 18 }
                        : { x: 52, y: [44, 44, 122], width: 88, height: [96, 96, 18] }
                      : { x: 52, y: 44, width: 88, height: 96 }
                  }
                  transition={{
                    duration: pour,
                    ease: [0.33, 0, 0.2, 1],
                    ...(reduceMotion ? {} : { times: [0, 0.2, 1] }),
                  }}
                />
              </mask>
              <clipPath id={`${rid}-cupIn`}>
                <path d="M 244 96 L 244 152 Q 244 164 258 164 L 310 164 Q 324 164 324 152 L 324 96 Z" />
              </clipPath>
            </defs>

            {/* Cup + saucer (static, drawn first) */}
            <ellipse cx="284" cy="170" rx="56" ry="10" fill="none" stroke={ink} strokeWidth="1.8" opacity="0.55" />
            <path
              d="M 240 92 L 240 149 Q 240 162 256 162 L 312 162 Q 328 162 328 149 L 328 92 Z"
              fill="none"
              stroke={ink}
              strokeWidth="2.2"
            />
            <path d="M 328 104 Q 348 104 348 126 Q 348 148 328 145" fill="none" stroke={ink} strokeWidth="2" />
            <line x1="236" y1="92" x2="332" y2="92" stroke={ink} strokeWidth="2.8" strokeLinecap="round" />

            <g clipPath={`url(#${rid}-cupIn)`}>
              <motion.rect
                x="238"
                width="92"
                fill={`url(#${rid}-cupChai)`}
                initial={{ y: 161, height: 4 }}
                animate={
                  teaOn
                    ? reduceMotion
                      ? { y: 98, height: 67 }
                      : { y: [161, 161, 98], height: [4, 4, 67] }
                    : { y: 161, height: 4 }
                }
                transition={{
                  duration: pour,
                  ease: [0.33, 0, 0.2, 1],
                  ...(reduceMotion ? {} : { times: [0, 0.24, 1] }),
                }}
              />
            </g>

            {/* Teapot: chai layer + bespoke engraving-style line art, tilt + pour */}
            <motion.g
              style={{ transformOrigin: '96px 158px', transformBox: 'fill-box' }}
              initial={false}
              animate={
                teaOn
                  ? reduceMotion
                    ? { rotate: -17 }
                    : { rotate: [0, 0, -17] }
                  : { rotate: 0 }
              }
              transition={{
                duration: pour,
                ease: [0.33, 0, 0.2, 1],
                ...(reduceMotion ? {} : { times: [0, 0.18, 1] }),
              }}
            >
              <g clipPath={`url(#${rid}-potBody)`} mask={`url(#${rid}-potLevel)`}>
                <rect x="40" y="36" width="112" height="118" fill={`url(#${rid}-potChai)`} />
              </g>

              <g
                stroke={ink}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="intro-cin__teapot-draw"
              >
                {/* Foot / base flare */}
                <path
                  d="M 58 152 Q 96 168 134 152 L 132 146 Q 96 156 60 146 Z"
                  strokeWidth="2.1"
                  opacity="0.92"
                />
                <path d="M 64 148 Q 96 154 128 148" strokeWidth="1" opacity="0.4" />

                {/* Main bulb body — vintage silhouette */}
                <path
                  d="M 60 146 
                     C 52 130 50 98 56 76 
                     C 62 52 78 44 96 42 
                     C 114 44 130 52 136 76 
                     C 142 98 140 130 132 146"
                  strokeWidth="2.35"
                />
                <path
                  d="M 66 138 C 60 118 60 90 68 72 C 76 58 88 50 96 48 C 104 50 116 58 124 72 C 132 90 132 118 126 138"
                  strokeWidth="1"
                  opacity="0.45"
                />

                {/* Upper shoulder band + bead row */}
                <path d="M 64 78 Q 96 70 128 78" strokeWidth="1.2" opacity="0.55" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <circle key={i} cx={72 + i * 7} cy="76" r="1.1" fill={ink} stroke="none" opacity="0.5" />
                ))}

                {/* Mid waist band with filigree ticks */}
                <path d="M 62 112 Q 96 106 130 112" strokeWidth="1" opacity="0.5" />
                <path d="M 68 110 L 68 116 M 80 109 L 80 117 M 96 108 L 96 118 M 112 109 L 112 117 M 124 110 L 124 116" strokeWidth="0.9" opacity="0.38" />

                {/* Central floral / scroll motif (symmetrical engraving) */}
                <path d="M 96 118 C 88 108 88 96 96 92 C 104 96 104 108 96 118" strokeWidth="1.15" opacity="0.7" />
                <path d="M 96 92 C 92 88 90 84 92 80 C 94 78 98 78 100 80" strokeWidth="0.9" opacity="0.55" />
                <path d="M 96 92 C 100 88 102 84 100 80 C 98 78 94 78 92 80" strokeWidth="0.9" opacity="0.55" />
                <path d="M 96 118 L 96 128" strokeWidth="0.85" opacity="0.45" />
                <path d="M 82 104 Q 76 100 74 96 Q 78 92 84 96" strokeWidth="0.85" opacity="0.5" />
                <path d="M 110 104 Q 116 100 118 96 Q 114 92 108 96" strokeWidth="0.85" opacity="0.5" />

                {/* Light cross-hatch shading (woodcut feel) */}
                <g strokeWidth="0.45" opacity="0.22">
                  <line x1="74" y1="86" x2="82" y2="94" />
                  <line x1="70" y1="92" x2="78" y2="100" />
                  <line x1="110" y1="86" x2="118" y2="94" />
                  <line x1="114" y1="92" x2="122" y2="100" />
                  <line x1="78" y1="124" x2="86" y2="132" />
                  <line x1="104" y1="124" x2="112" y2="132" />
                </g>

                {/* Lid dome + finial */}
                <path d="M 72 48 Q 96 28 120 48" strokeWidth="2" />
                <path d="M 78 48 Q 96 36 114 48" strokeWidth="1" opacity="0.45" />
                <path d="M 84 46 Q 96 40 108 46" strokeWidth="0.9" opacity="0.38" />
                <circle cx="96" cy="32" r="5.5" strokeWidth="1.6" />
                <path d="M 96 27 L 96 24" strokeWidth="1.2" />
                <circle cx="96" cy="23" r="2" strokeWidth="1" />

                {/* Spout — long curve (pour tip ~168, 76) */}
                <path
                  d="M 126 64 C 142 56 158 52 172 58 C 182 62 186 68 184 74 C 182 80 174 82 166 78"
                  strokeWidth="2.15"
                />
                <path d="M 134 62 C 150 56 166 58 174 66" strokeWidth="1" opacity="0.4" />
                <path d="M 140 66 L 146 72 M 152 64 L 158 70" strokeWidth="0.75" opacity="0.32" />

                {/* Ornate handle — scroll ends */}
                <path
                  d="M 58 70 C 38 64 28 82 30 102 C 32 122 44 138 56 142 C 58 130 54 118 54 102 C 54 90 56 78 58 70"
                  strokeWidth="2.25"
                />
                <path d="M 48 78 Q 40 88 40 100 Q 40 114 50 128" strokeWidth="1" opacity="0.42" />
                <path
                  d="M 34 98 Q 30 96 28 100 Q 30 104 34 102"
                  strokeWidth="0.9"
                  opacity="0.5"
                />
              </g>

              <motion.path
                d="M 168 76 C 198 82 238 90 276 98 C 298 102 316 100 318 94"
                fill="none"
                stroke={`url(#${rid}-stream)`}
                strokeWidth="3.2"
                strokeLinecap="round"
                initial={false}
                animate={
                  teaOn
                    ? reduceMotion
                      ? { pathLength: 1, opacity: 0 }
                      : { pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 0.85, 0] }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{
                  duration: pour,
                  ease: 'easeInOut',
                  ...(reduceMotion ? {} : { times: [0, 0.2, 0.3, 0.8, 1] }),
                }}
              />
            </motion.g>

            <motion.g
              initial={false}
              animate={{ opacity: teaOn ? 0.42 : 0 }}
              transition={{ duration: 0.9, delay: reduceMotion ? 0 : 1.1 }}
            >
              <path d="M 272 78 Q 278 62 270 46 Q 264 34 274 20" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.4">
                <animate
                  attributeName="d"
                  dur="2.6s"
                  repeatCount="indefinite"
                  values="M 272 78 Q 278 62 270 46 Q 264 34 274 20;M 272 78 Q 266 60 276 44 Q 284 30 272 18;M 272 78 Q 278 62 270 46 Q 264 34 274 20"
                />
              </path>
            </motion.g>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
