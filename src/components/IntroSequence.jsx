import { motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

const DOOR_MS = 1800;
const LIGHT_DELAY_MS = 200;
const TEA_DELAY_MS = 450;
const TEA_HOLD_MS = 2800;
const EXIT_FADE_MS = 950;

const doorEase = [0.42, 0, 0.58, 1];

/**
 * Cinematic intro: double doors → soft light → folk audio → tea pour → menu.
 * Vite + React (same patterns apply in Next.js — swap routing if needed).
 */
export default function IntroSequence({ onComplete }) {
  const rid = useId().replace(/:/g, '');
  const reduceMotion = useReducedMotion();

  const [started, setStarted] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [teaOn, setTeaOn] = useState(false);
  const [exiting, setExiting] = useState(false);

  const audioRef = useRef(null);
  const timersRef = useRef([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const finish = useCallback(() => {
    clearTimers();
    try {
      audioRef.current?.pause();
    } catch {
      /* ignore */
    }
    onComplete?.();
  }, [clearTimers, onComplete]);

  const skip = useCallback(() => {
    clearTimers();
    try {
      audioRef.current?.pause();
    } catch {
      /* ignore */
    }
    onComplete?.();
  }, [clearTimers, onComplete]);

  useEffect(() => {
    audioRef.current = new Audio('/audio/udaipur-theme.mp3');
    audioRef.current.volume = 0.34;
    return () => {
      clearTimers();
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [clearTimers]);

  const queue = useCallback((fn, ms) => {
    timersRef.current.push(setTimeout(fn, ms));
  }, []);

  /* After doors finish sliding: light + audio */
  useEffect(() => {
    if (!doorsOpen) return;
    const ms = reduceMotion ? 0 : DOOR_MS;
    queue(() => {
      setLightOn(true);
      audioRef.current?.play().catch(() => {});
    }, ms + LIGHT_DELAY_MS);
    return () => clearTimers();
  }, [doorsOpen, reduceMotion, queue, clearTimers]);

  /* Tea beat */
  useEffect(() => {
    if (!lightOn) return;
    queue(() => setTeaOn(true), reduceMotion ? 0 : TEA_DELAY_MS);
    return () => clearTimers();
  }, [lightOn, reduceMotion, queue, clearTimers]);

  /* Hold tea, then exit */
  useEffect(() => {
    if (!teaOn) return;
    queue(() => setExiting(true), reduceMotion ? 400 : TEA_HOLD_MS);
    return () => clearTimers();
  }, [teaOn, reduceMotion, queue, clearTimers]);

  /* Fade complete → hand off to app */
  useEffect(() => {
    if (!exiting) return;
    queue(finish, EXIT_FADE_MS);
    return () => clearTimers();
  }, [exiting, finish, queue, clearTimers]);

  const onBegin = () => {
    if (started) return;
    setStarted(true);
    if (reduceMotion) {
      setDoorsOpen(true);
      setLightOn(true);
      setTeaOn(true);
      audioRef.current?.play().catch(() => {});
      return;
    }
    queue(() => setDoorsOpen(true), 120);
  };

  const doorTransition = reduceMotion
    ? { duration: 0.01 }
    : { duration: DOOR_MS / 1000, ease: doorEase };

  return (
    <motion.div
      className="intro-cinematic"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome sequence"
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_FADE_MS / 1000, ease: 'easeInOut' }}
    >
      <div className="intro-cinematic__inner">
        <button type="button" className="intro-cinematic__skip" onClick={skip}>
          Skip intro
        </button>

        {!started && (
          <div className="intro-cinematic__curtain">
            <p className="intro-cinematic__hint font-typewriter text-ink text-xs tracking-widest uppercase opacity-80 mb-4">
              Tap to enter
            </p>
            <button type="button" className="intro-cinematic__begin" onClick={onBegin}>
              Begin
            </button>
          </div>
        )}

        <div className="intro-cinematic__stage">
          {/* Window + doors */}
          <div className="intro-cinematic__window-wrap">
            <motion.div
              className="intro-cinematic__glow"
              initial={false}
              animate={{
                opacity: lightOn ? 0.52 : 0,
                scale: lightOn ? 1 : 0.88,
              }}
              transition={{ duration: reduceMotion ? 0.01 : 1.15, ease: 'easeOut' }}
            />

            {/* Two real image panels (split from same source) */}
            <div className="intro-cinematic__panel-track" aria-hidden>
              <motion.div
                className="intro-cinematic__panel-shell intro-cinematic__panel-shell--left"
                initial={false}
                animate={{
                  x: doorsOpen ? '-100%' : '0%',
                  rotateY: doorsOpen ? -72 : 0,
                }}
                transition={doorTransition}
              >
                <img
                  className="intro-cinematic__panel-img intro-cinematic__panel-img--left"
                  src="/retrowindow.png"
                  alt=""
                  draggable={false}
                />
              </motion.div>

              <motion.div
                className="intro-cinematic__panel-shell intro-cinematic__panel-shell--right"
                initial={false}
                animate={{
                  x: doorsOpen ? '100%' : '0%',
                  rotateY: doorsOpen ? 72 : 0,
                }}
                transition={doorTransition}
              >
                <img
                  className="intro-cinematic__panel-img intro-cinematic__panel-img--right"
                  src="/retrowindow.png"
                  alt=""
                  draggable={false}
                />
              </motion.div>
            </div>

            <motion.div
              className="intro-cinematic__rays"
              initial={false}
              animate={{
                opacity: lightOn ? 0.85 : 0,
                scaleY: lightOn ? 1 : 0.35,
              }}
              transition={{ duration: reduceMotion ? 0.01 : 1.25, ease: 'easeOut', delay: 0.12 }}
            />
          </div>

          {/* Tea pour — SVG + motion (swap for Lottie by replacing this block) */}
          <motion.div
            className="intro-cinematic__tea"
            initial={false}
            animate={{
              opacity: teaOn ? 1 : 0,
              y: teaOn ? 0 : 14,
            }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 240 140" className="intro-cinematic__tea-svg" aria-hidden>
              <defs>
                <linearGradient id={`${rid}-tea`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6B4423" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#A67C52" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id={`${rid}-cup`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#5C3820" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#967052" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <ellipse cx="166" cy="118" rx="38" ry="8" fill="none" stroke="#3A2515" strokeWidth="1.8" opacity="0.45" />
              <path
                d="M 134 66 L 134 104 Q 134 114 146 114 L 186 114 Q 198 114 198 104 L 198 66 Z"
                fill="none"
                stroke="#3A2515"
                strokeWidth="2"
              />
              <path d="M 198 74 Q 214 74 214 90 Q 214 106 198 104" fill="none" stroke="#3A2515" strokeWidth="1.8" />
              <clipPath id={`${rid}-cupClip`}>
                <path d="M 136 68 L 136 102 Q 136 112 148 112 L 184 112 Q 196 112 196 102 L 196 68 Z" />
              </clipPath>
              <g clipPath={`url(#${rid}-cupClip)`}>
                <motion.rect
                  x="134"
                  y="72"
                  width="64"
                  height="44"
                  fill={`url(#${rid}-cup)`}
                  initial={false}
                  animate={{ scaleY: teaOn ? 1 : 0.1 }}
                  transition={{ duration: reduceMotion ? 0.01 : 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                  style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                />
              </g>
              <line x1="131" y1="66" x2="201" y2="66" stroke="#3A2515" strokeWidth="2.5" strokeLinecap="round" />

              <motion.g
                style={{ transformOrigin: '108px 88px' }}
                initial={false}
                animate={{ rotate: teaOn ? -15 : 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 2.2, ease: 'easeInOut' }}
              >
                <ellipse cx="72" cy="94" rx="36" ry="26" fill="none" stroke="#3A2515" strokeWidth="2" />
                <ellipse cx="72" cy="94" rx="36" ry="12" fill="none" stroke="#3A2515" strokeWidth="0.8" opacity="0.35" />
                <path d="M 104 78 Q 122 68 134 62 L 136 68 Q 122 76 106 84" fill="none" stroke="#3A2515" strokeWidth="1.8" />
                <path d="M 38 80 Q 22 80 22 96 Q 22 110 40 112" fill="none" stroke="#3A2515" strokeWidth="2" />
                <path d="M 44 70 Q 72 52 100 70" fill="none" stroke="#3A2515" strokeWidth="1.8" />
                <circle cx="72" cy="58" r="5" fill="none" stroke="#3A2515" strokeWidth="1.5" />
              </motion.g>

              <motion.path
                d="M 134 62 Q 140 78 150 96 Q 158 108 166 104"
                fill="none"
                stroke={`url(#${rid}-tea)`}
                strokeWidth="2.8"
                strokeLinecap="round"
                initial={false}
                animate={teaOn ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 2.1, ease: 'easeOut', delay: 0.12 }}
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
