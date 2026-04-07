import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

const WINDOW_HOLD_MS = 700;
const LIGHT_DELAY_MS = 220;
const TEA_DELAY_MS = 500;
const TEA_HOLD_MS = 3200;
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
        </div>

        {/* ─── TEA POUR (bigger, retro line-art) ─── */}
        <motion.div
          className="intro-cin__tea"
          initial={false}
          animate={{ opacity: teaOn ? 1 : 0, y: teaOn ? 0 : 16 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.7, ease: 'easeOut' }}
        >
          <svg viewBox="0 0 320 180" className="intro-cin__tea-svg" aria-hidden>
            <defs>
              <linearGradient id={`${rid}-ts`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6B4423" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#A67C52" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id={`${rid}-lq`} x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#5C3820" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#967052" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Saucer */}
            <ellipse cx="222" cy="154" rx="52" ry="10" fill="none" stroke={ink} strokeWidth="2" opacity="0.45" />

            {/* Cup */}
            <path d="M 178 84 L 178 138 Q 178 150 194 150 L 250 150 Q 266 150 266 138 L 266 84 Z"
              fill="none" stroke={ink} strokeWidth="2.5" />
            {/* Cup handle */}
            <path d="M 266 96 Q 286 96 286 118 Q 286 140 266 138" fill="none" stroke={ink} strokeWidth="2.2" />
            {/* Rim */}
            <line x1="174" y1="84" x2="270" y2="84" stroke={ink} strokeWidth="3" strokeLinecap="round" />
            {/* Cup decorative band */}
            <line x1="180" y1="100" x2="264" y2="100" stroke={ink} strokeWidth="0.8" opacity="0.4" />

            {/* Tea liquid */}
            <clipPath id={`${rid}-cc`}>
              <path d="M 180 86 L 180 136 Q 180 148 196 148 L 248 148 Q 264 148 264 136 L 264 86 Z" />
            </clipPath>
            <g clipPath={`url(#${rid}-cc)`}>
              <motion.rect x="178" y="92" width="90" height="60" fill={`url(#${rid}-lq)`}
                initial={false}
                animate={{ scaleY: teaOn ? 1 : 0.08 }}
                transition={{ duration: reduceMotion ? 0.01 : 2.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
              />
            </g>

            {/* Steam wisps */}
            <motion.g opacity={0.4}
              initial={false}
              animate={{ opacity: teaOn ? 0.4 : 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <path d="M 210 70 Q 216 54 208 38 Q 204 28 212 16" fill="none" stroke={ink} strokeWidth="1.3" opacity="0.4">
                <animate attributeName="d" dur="2.5s" repeatCount="indefinite"
                  values="M 210 70 Q 216 54 208 38 Q 204 28 212 16;M 210 70 Q 204 52 212 36 Q 218 24 210 14;M 210 70 Q 216 54 208 38 Q 204 28 212 16" />
              </path>
              <path d="M 232 72 Q 240 56 230 38" fill="none" stroke={ink} strokeWidth="1.2" opacity="0.35">
                <animate attributeName="d" dur="2.8s" repeatCount="indefinite"
                  values="M 232 72 Q 240 56 230 38;M 232 72 Q 224 54 234 36;M 232 72 Q 240 56 230 38" />
              </path>
              <path d="M 250 74 Q 258 60 248 44" fill="none" stroke={ink} strokeWidth="1.1" opacity="0.3">
                <animate attributeName="d" dur="3s" repeatCount="indefinite"
                  values="M 250 74 Q 258 60 248 44;M 250 74 Q 242 58 252 42;M 250 74 Q 258 60 248 44" />
              </path>
            </motion.g>

            {/* Teapot */}
            <motion.g
              style={{ transformOrigin: '146px 116px' }}
              initial={false}
              animate={{ rotate: teaOn ? -16 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 2.4, ease: 'easeInOut' }}
            >
              <ellipse cx="90" cy="122" rx="48" ry="34" fill="none" stroke={ink} strokeWidth="2.5" />
              {/* Decorative band */}
              <ellipse cx="90" cy="122" rx="48" ry="16" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.35" />
              {/* Spout */}
              <path d="M 134 102 Q 156 88 174 80 L 178 88 Q 158 98 138 108" fill="none" stroke={ink} strokeWidth="2.2" />
              {/* Handle */}
              <path d="M 44 104 Q 24 104 24 124 Q 24 144 46 146" fill="none" stroke={ink} strokeWidth="2.5" />
              {/* Lid */}
              <path d="M 50 90 Q 90 68 130 90" fill="none" stroke={ink} strokeWidth="2.2" />
              {/* Knob */}
              <circle cx="90" cy="74" r="7" fill="none" stroke={ink} strokeWidth="1.8" />
              {/* Decorative lines on pot */}
              <path d="M 56 108 Q 90 96 124 108" fill="none" stroke={ink} strokeWidth="0.7" opacity="0.35" />
            </motion.g>

            {/* Tea stream */}
            <motion.path
              d="M 174 80 Q 182 100 196 126 Q 208 142 222 138"
              fill="none" stroke={`url(#${rid}-ts)`} strokeWidth="3.2" strokeLinecap="round"
              initial={false}
              animate={teaOn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 2.2, ease: 'easeOut', delay: 0.15 }}
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
