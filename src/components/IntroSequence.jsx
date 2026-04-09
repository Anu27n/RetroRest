import { motion, useReducedMotion } from 'framer-motion';
import { GiCamel } from 'react-icons/gi';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

const WINDOW_HOLD_MS = 700;
const DOOR_OPEN_MS = 1400;
const LIGHT_DELAY_MS = 220;
const TEA_DELAY_MS = 500;
const TEA_POUR_MS = 2800;
const TEA_HOLD_MS = 3800;
const EXIT_FADE_MS = 950;

export default function IntroSequence({ onComplete, audioRef }) {
  const rid = useId().replace(/:/g, '');
  const reduceMotion = useReducedMotion();

  const [started, setStarted] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
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
    if (!started) return;
    if (reduceMotion) return;
    queue(() => setDoorsOpen(true), WINDOW_HOLD_MS);
    return clearTimers;
  }, [started, reduceMotion, queue, clearTimers]);

  useEffect(() => {
    if (!doorsOpen) return;
    queue(() => setLightOn(true), reduceMotion ? 0 : 600);
    return clearTimers;
  }, [doorsOpen, reduceMotion, queue, clearTimers]);

  const onBegin = () => {
    if (started) return;
    const a = audioRef.current;
    if (a) {
      a.currentTime = 0;
      a.muted = false;
      a.volume = 0.3;
      a.play().catch(() => {});
    }
    setStarted(true);
    if (reduceMotion) {
      setDoorsOpen(true);
      setLightOn(true);
      setTeaOn(true);
    }
  };

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

  const ink = '#5C3D28';
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

          <svg className="intro-cin__door-svg" viewBox="-6 -8 312 434" fill="none">
            <defs>
              <radialGradient id={`${rid}-opening`} cx="50%" cy="32%" r="72%">
                <stop offset="0%" stopColor="#fffef5" stopOpacity="0.98" />
                <stop offset="35%" stopColor="#ffefbc" stopOpacity="0.88" />
                <stop offset="62%" stopColor="#f0d48a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#e4c896" stopOpacity="0.12" />
              </radialGradient>
            </defs>

            {/* Warm light behind door opening */}
            <motion.path
              d="M 34 392 L 34 126 A 116 108 0 0 1 266 126 L 266 392 Z"
              fill={`url(#${rid}-opening)`}
              stroke="none"
              initial={false}
              animate={{ opacity: lightOn ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: 'easeOut' }}
            />

            {/* ═══ RAJASTHANI MAN — appears inside window after doors open & light glows ═══ */}
            <defs>
              <clipPath id={`${rid}-archClip`}>
                <path d="M 34 392 L 34 126 A 116 108 0 0 1 266 126 L 266 392 Z" />
              </clipPath>
            </defs>
            <motion.g
              clipPath={`url(#${rid}-archClip)`}
              initial={{ opacity: 0 }}
              animate={{ opacity: lightOn ? 1 : 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 1.2, ease: 'easeOut', delay: reduceMotion ? 0 : 0.4 }}
            >
              <image
                href="/assets/rajasthani-namaste.png"
                x="34"
                y="126"
                width="232"
                height="266"
                preserveAspectRatio="xMidYMin slice"
                style={{
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.68) brightness(1.06) sepia(0.12) grayscale(0.05)',
                  opacity: 0.9,
                }}
              />
            </motion.g>
            <path d="M 16 400 L 16 118 A 134 124 0 0 1 284 118 L 284 400 Z"
              stroke={ink} strokeWidth="5.5" strokeLinejoin="round" />
            <path d="M 22 397 L 22 120 A 128 118 0 0 1 278 120 L 278 397 Z"
              stroke={ink} strokeWidth="1.4" opacity="0.55" />

            {/* Bead row along outer arch */}
            <g fill={ink} stroke="none" opacity="0.45">
              {[...Array(16)].map((_, i) => {
                const angle = Math.PI * (0.06 + i * 0.058);
                const cx = 150 - 132 * Math.cos(angle);
                const cy = 118 - 122 * Math.sin(angle);
                return <circle key={`ob${i}`} cx={cx} cy={cy} r="1.6" />;
              })}
            </g>

            {/* ═══ INNER ARCH FRAME — double outline ═══ */}
            <path d="M 34 392 L 34 126 A 116 108 0 0 1 266 126 L 266 392 Z"
              stroke={ink} strokeWidth="3" />
            <path d="M 38 390 L 38 128 A 112 104 0 0 1 262 128 L 262 390 Z"
              stroke={ink} strokeWidth="1" opacity="0.45" />

            {/* ═══ KEYSTONE at arch apex ═══ */}
            <path d="M 138 22 L 142 10 L 158 10 L 162 22 L 158 36 Q 150 42 142 36 Z"
              stroke={ink} strokeWidth="2" fill="none" />
            <path d="M 144 15 L 150 28 L 156 15" stroke={ink} strokeWidth="0.8" opacity="0.5" />
            <circle cx="150" cy="18" r="2.5" stroke={ink} strokeWidth="0.9" fill="none" opacity="0.55" />

            {/* ═══ ARCH TYMPANUM — ornate sunburst + floral scrolls ═══ */}
            {/* Central medallion / rosette */}
            <circle cx="150" cy="72" r="18" stroke={ink} strokeWidth="2" />
            <circle cx="150" cy="72" r="13" stroke={ink} strokeWidth="1.2" opacity="0.6" />
            <circle cx="150" cy="72" r="7" stroke={ink} strokeWidth="1.5" />
            <circle cx="150" cy="72" r="3" fill={ink} opacity="0.5" />
            {/* Petal ring inside rosette */}
            {[...Array(8)].map((_, i) => {
              const a = (i * Math.PI) / 4;
              const x1 = 150 + 7 * Math.cos(a);
              const y1 = 72 + 7 * Math.sin(a);
              const x2 = 150 + 13 * Math.cos(a);
              const y2 = 72 + 13 * Math.sin(a);
              return <line key={`p${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={ink} strokeWidth="0.9" opacity="0.55" />;
            })}

            {/* Sunburst rays — varying thickness like engraving */}
            <g stroke={ink} opacity="0.6">
              <path d="M 150 54 L 150 126" strokeWidth="1.5" />
              <path d="M 150 60 L 96 126" strokeWidth="1.3" />
              <path d="M 150 60 L 204 126" strokeWidth="1.3" />
              <path d="M 150 54 L 64 120" strokeWidth="1.1" />
              <path d="M 150 54 L 236 120" strokeWidth="1.1" />
              <path d="M 150 48 L 44 116" strokeWidth="0.9" opacity="0.5" />
              <path d="M 150 48 L 256 116" strokeWidth="0.9" opacity="0.5" />
              <path d="M 150 56 L 128 126" strokeWidth="0.7" opacity="0.4" />
              <path d="M 150 56 L 172 126" strokeWidth="0.7" opacity="0.4" />
            </g>

            {/* Floral scroll pairs flanking the rosette */}
            <g stroke={ink} strokeWidth="1" fill="none" opacity="0.55">
              {/* Left scrollwork */}
              <path d="M 132 72 C 118 62 102 66 98 78 C 94 90 106 96 112 88" />
              <path d="M 98 78 C 88 72 76 80 80 92" strokeWidth="0.7" opacity="0.4" />
              <path d="M 108 68 Q 100 58 88 62 Q 78 68 82 80" strokeWidth="0.7" opacity="0.4" />
              {/* Right scrollwork (mirrored) */}
              <path d="M 168 72 C 182 62 198 66 202 78 C 206 90 194 96 188 88" />
              <path d="M 202 78 C 212 72 224 80 220 92" strokeWidth="0.7" opacity="0.4" />
              <path d="M 192 68 Q 200 58 212 62 Q 222 68 218 80" strokeWidth="0.7" opacity="0.4" />
            </g>

            {/* Scallop trim along inner arch curve */}
            <g stroke={ink} strokeWidth="0.85" opacity="0.5" fill="none">
              {[...Array(11)].map((_, i) => {
                const angle = Math.PI * (0.12 + i * 0.07);
                const cx = 150 - 118 * Math.cos(angle);
                const cy = 126 - 108 * Math.sin(angle);
                return <circle key={`sc${i}`} cx={cx} cy={cy} r="8" />;
              })}
            </g>

            {/* ═══ PILLAR COLUMNS — with capital & base moldings ═══ */}
            {/* Left pillar */}
            <g stroke={ink} fill="none">
              <rect x="18" y="122" width="18" height="278" strokeWidth="2" />
              <line x1="22" y1="128" x2="22" y2="396" strokeWidth="0.5" opacity="0.3" />
              <line x1="32" y1="128" x2="32" y2="396" strokeWidth="0.5" opacity="0.3" />
              <line x1="27" y1="128" x2="27" y2="396" strokeWidth="0.6" opacity="0.25" />
              {/* Capital molding */}
              <rect x="14" y="116" width="26" height="10" rx="1" strokeWidth="1.8" />
              <line x1="16" y1="121" x2="38" y2="121" strokeWidth="0.7" opacity="0.5" />
              {/* Base molding */}
              <rect x="14" y="396" width="26" height="8" rx="1" strokeWidth="1.6" />
              <line x1="16" y1="400" x2="38" y2="400" strokeWidth="0.6" opacity="0.4" />
            </g>
            {/* Right pillar */}
            <g stroke={ink} fill="none">
              <rect x="264" y="122" width="18" height="278" strokeWidth="2" />
              <line x1="268" y1="128" x2="268" y2="396" strokeWidth="0.5" opacity="0.3" />
              <line x1="278" y1="128" x2="278" y2="396" strokeWidth="0.5" opacity="0.3" />
              <line x1="273" y1="128" x2="273" y2="396" strokeWidth="0.6" opacity="0.25" />
              {/* Capital molding */}
              <rect x="260" y="116" width="26" height="10" rx="1" strokeWidth="1.8" />
              <line x1="262" y1="121" x2="284" y2="121" strokeWidth="0.7" opacity="0.5" />
              {/* Base molding */}
              <rect x="260" y="396" width="26" height="8" rx="1" strokeWidth="1.6" />
              <line x1="262" y1="400" x2="284" y2="400" strokeWidth="0.6" opacity="0.4" />
            </g>

            {/* ═══ SILL / BASE — ornate with molding lines ═══ */}
            <rect x="10" y="400" width="280" height="16" rx="2" stroke={ink} strokeWidth="3.5" fill="none" />
            <line x1="14" y1="408" x2="286" y2="408" stroke={ink} strokeWidth="1.2" opacity="0.5" />
            <line x1="12" y1="412" x2="288" y2="412" stroke={ink} strokeWidth="0.7" opacity="0.35" />
            {/* Decorative notches along sill top */}
            <g stroke={ink} strokeWidth="0.8" opacity="0.4">
              {[...Array(14)].map((_, i) => {
                const x = 30 + i * 18;
                return <line key={`sn${i}`} x1={x} y1="400" x2={x} y2="404" />;
              })}
            </g>

            {/* ═══ TRANSOM BAR — heavy + thin double ═══ */}
            <line x1="34" y1="126" x2="266" y2="126" stroke={ink} strokeWidth="4" />
            <line x1="36" y1="130" x2="264" y2="130" stroke={ink} strokeWidth="1" opacity="0.4" />

            {/* ═══ CENTRE MULLION — fades as doors swing open ═══ */}
            <motion.g
              initial={false}
              animate={{ opacity: doorsOpen ? 0 : 1 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.5, ease: 'easeOut' }}
            >
              <line x1="150" y1="126" x2="150" y2="392" stroke={ink} strokeWidth="3.5" />
              <line x1="147" y1="130" x2="147" y2="390" stroke={ink} strokeWidth="0.6" opacity="0.35" />
              <line x1="153" y1="130" x2="153" y2="390" stroke={ink} strokeWidth="0.6" opacity="0.35" />
            </motion.g>

            {/* ═══ LEFT DOOR ═══ */}
            <motion.g
              style={{ transformOrigin: '34px 260px' }}
              initial={false}
              animate={{ scaleX: doorsOpen ? 0 : 1, opacity: doorsOpen ? 0.15 : 1 }}
              transition={{ duration: reduceMotion ? 0.01 : DOOR_OPEN_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Outer panel frame */}
              <rect x="40" y="132" width="106" height="258" rx="2" stroke={ink} strokeWidth="2.2" />
              {/* Upper panel — double border */}
              <rect x="48" y="140" width="90" height="118" rx="3" stroke={ink} strokeWidth="1.6" opacity="0.8" />
              <rect x="52" y="144" width="82" height="110" rx="2" stroke={ink} strokeWidth="0.7" opacity="0.4" />
              {/* Lower panel — double border */}
              <rect x="48" y="266" width="90" height="116" rx="3" stroke={ink} strokeWidth="1.6" opacity="0.8" />
              <rect x="52" y="270" width="82" height="108" rx="2" stroke={ink} strokeWidth="0.7" opacity="0.4" />

              {/* Upper panel arch decoration — multi-layer */}
              <path d="M 56 252 Q 93 188 130 252" fill="none" stroke={ink} strokeWidth="1.4" opacity="0.65" />
              <path d="M 62 252 Q 93 196 124 252" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.45" />
              <path d="M 68 252 Q 93 208 118 252" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.3" />
              {/* Lower panel arch decoration */}
              <path d="M 56 374 Q 93 310 130 374" fill="none" stroke={ink} strokeWidth="1.4" opacity="0.65" />
              <path d="M 62 374 Q 93 318 124 374" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.45" />
              <path d="M 68 374 Q 93 330 118 374" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.3" />

              {/* Floral centre ornament — upper panel */}
              <g stroke={ink} fill="none" opacity="0.55" strokeWidth="0.8">
                <path d="M 93 210 C 85 200 85 188 93 184 C 101 188 101 200 93 210" />
                <path d="M 93 184 L 93 178" />
                <circle cx="93" cy="176" r="2.5" strokeWidth="0.9" />
                <path d="M 83 196 Q 78 192 80 186" />
                <path d="M 103 196 Q 108 192 106 186" />
              </g>
              {/* Floral centre ornament — lower panel */}
              <g stroke={ink} fill="none" opacity="0.55" strokeWidth="0.8">
                <path d="M 93 332 C 85 322 85 310 93 306 C 101 310 101 322 93 332" />
                <path d="M 93 306 L 93 300" />
                <circle cx="93" cy="298" r="2.5" strokeWidth="0.9" />
                <path d="M 83 318 Q 78 314 80 308" />
                <path d="M 103 318 Q 108 314 106 308" />
              </g>

              {/* Door handle — ornate knob */}
              <g stroke={ink} strokeWidth="1.8" fill="none">
                <rect x="126" y="244" width="12" height="24" rx="3" />
                <circle cx="132" cy="260" r="3.5" strokeWidth="1.4" />
                <line x1="132" y1="248" x2="132" y2="253" strokeWidth="1.2" />
              </g>

              {/* Cross-hatch shading — engraving feel */}
              <g stroke={ink} strokeWidth="0.35" opacity="0.18">
                <line x1="56" y1="148" x2="64" y2="156" />
                <line x1="56" y1="156" x2="64" y2="164" />
                <line x1="120" y1="148" x2="128" y2="156" />
                <line x1="120" y1="156" x2="128" y2="164" />
                <line x1="56" y1="274" x2="64" y2="282" />
                <line x1="56" y1="282" x2="64" y2="290" />
                <line x1="120" y1="274" x2="128" y2="282" />
                <line x1="120" y1="282" x2="128" y2="290" />
                <line x1="56" y1="362" x2="64" y2="370" />
                <line x1="120" y1="362" x2="128" y2="370" />
              </g>

              {/* Subtle wood-grain lines */}
              <g stroke={ink} strokeWidth="0.3" opacity="0.15">
                <path d="M 58 148 Q 62 210 56 268 Q 60 330 58 380" />
                <path d="M 93 140 Q 88 220 94 290 Q 90 350 92 386" />
                <path d="M 128 148 Q 132 220 126 310 Q 130 360 128 380" />
              </g>
            </motion.g>

            {/* ═══ RIGHT DOOR ═══ */}
            <motion.g
              style={{ transformOrigin: '266px 260px' }}
              initial={false}
              animate={{ scaleX: doorsOpen ? 0 : 1, opacity: doorsOpen ? 0.15 : 1 }}
              transition={{ duration: reduceMotion ? 0.01 : DOOR_OPEN_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Outer panel frame */}
              <rect x="154" y="132" width="106" height="258" rx="2" stroke={ink} strokeWidth="2.2" />
              {/* Upper panel — double border */}
              <rect x="162" y="140" width="90" height="118" rx="3" stroke={ink} strokeWidth="1.6" opacity="0.8" />
              <rect x="166" y="144" width="82" height="110" rx="2" stroke={ink} strokeWidth="0.7" opacity="0.4" />
              {/* Lower panel — double border */}
              <rect x="162" y="266" width="90" height="116" rx="3" stroke={ink} strokeWidth="1.6" opacity="0.8" />
              <rect x="166" y="270" width="82" height="108" rx="2" stroke={ink} strokeWidth="0.7" opacity="0.4" />

              {/* Upper panel arch decoration */}
              <path d="M 170 252 Q 207 188 244 252" fill="none" stroke={ink} strokeWidth="1.4" opacity="0.65" />
              <path d="M 176 252 Q 207 196 238 252" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.45" />
              <path d="M 182 252 Q 207 208 232 252" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.3" />
              {/* Lower panel arch decoration */}
              <path d="M 170 374 Q 207 310 244 374" fill="none" stroke={ink} strokeWidth="1.4" opacity="0.65" />
              <path d="M 176 374 Q 207 318 238 374" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.45" />
              <path d="M 182 374 Q 207 330 232 374" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.3" />

              {/* Floral centre ornament — upper panel */}
              <g stroke={ink} fill="none" opacity="0.55" strokeWidth="0.8">
                <path d="M 207 210 C 199 200 199 188 207 184 C 215 188 215 200 207 210" />
                <path d="M 207 184 L 207 178" />
                <circle cx="207" cy="176" r="2.5" strokeWidth="0.9" />
                <path d="M 197 196 Q 192 192 194 186" />
                <path d="M 217 196 Q 222 192 220 186" />
              </g>
              {/* Floral centre ornament — lower panel */}
              <g stroke={ink} fill="none" opacity="0.55" strokeWidth="0.8">
                <path d="M 207 332 C 199 322 199 310 207 306 C 215 310 215 322 207 332" />
                <path d="M 207 306 L 207 300" />
                <circle cx="207" cy="298" r="2.5" strokeWidth="0.9" />
                <path d="M 197 318 Q 192 314 194 308" />
                <path d="M 217 318 Q 222 314 220 308" />
              </g>

              {/* Door handle — ornate knob */}
              <g stroke={ink} strokeWidth="1.8" fill="none">
                <rect x="162" y="244" width="12" height="24" rx="3" />
                <circle cx="168" cy="260" r="3.5" strokeWidth="1.4" />
                <line x1="168" y1="248" x2="168" y2="253" strokeWidth="1.2" />
              </g>

              {/* Cross-hatch shading */}
              <g stroke={ink} strokeWidth="0.35" opacity="0.18">
                <line x1="170" y1="148" x2="178" y2="156" />
                <line x1="170" y1="156" x2="178" y2="164" />
                <line x1="234" y1="148" x2="242" y2="156" />
                <line x1="234" y1="156" x2="242" y2="164" />
                <line x1="170" y1="274" x2="178" y2="282" />
                <line x1="170" y1="282" x2="178" y2="290" />
                <line x1="234" y1="274" x2="242" y2="282" />
                <line x1="234" y1="282" x2="242" y2="290" />
                <line x1="170" y1="362" x2="178" y2="370" />
                <line x1="234" y1="362" x2="242" y2="370" />
              </g>

              {/* Wood-grain lines */}
              <g stroke={ink} strokeWidth="0.3" opacity="0.15">
                <path d="M 172 148 Q 168 210 174 268 Q 170 330 172 380" />
                <path d="M 207 140 Q 212 220 206 290 Q 210 350 208 386" />
                <path d="M 240 148 Q 236 220 242 310 Q 238 360 240 380" />
              </g>
            </motion.g>

            {/* ═══ CORNER SPANDREL FLOURISHES ═══ */}
            <g stroke={ink} fill="none" strokeWidth="0.9" opacity="0.45">
              {/* Top-left corner scroll */}
              <path d="M 18 118 Q 8 108 12 96 Q 16 84 28 88 Q 34 92 30 100" />
              <path d="M 12 96 Q 4 92 6 82 Q 10 74 18 78" strokeWidth="0.65" opacity="0.35" />
              {/* Top-right corner scroll */}
              <path d="M 282 118 Q 292 108 288 96 Q 284 84 272 88 Q 266 92 270 100" />
              <path d="M 288 96 Q 296 92 294 82 Q 290 74 282 78" strokeWidth="0.65" opacity="0.35" />
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

        {!started && (
          <div className="intro-cin__curtain">
            <button type="button" className="intro-cin__begin" onClick={onBegin}>
              Tap to Enter
            </button>
          </div>
        )}

        {/* ─── TEA SCENE ───
             Wrapper is a plain div (no transforms/opacity = no isolation group).
             This lets the teapot's mix-blend-mode: multiply reach the page paper bg.
        */}
        <div
          className="intro-cin__tea intro-cin__tea--retro"
          style={{ position: 'relative' }}
        >
          {/* Teapot image — mix-blend-mode on THIS motion.div blends against page bg
              because no parent between here and .intro-cin creates isolation. */}
          <motion.div
            style={{
              position: 'absolute',
              left: '0%',
              top: '5%',
              width: '52%',
              zIndex: 2,
              transformOrigin: '18% 82%',
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
            }}
            initial={false}
            animate={
              teaOn
                ? reduceMotion
                  ? { opacity: 0.9, y: 0, rotate: 16 }
                  : { opacity: [0, 0.9, 0.9], y: [16, 0, 0], rotate: [0, 0, 16] }
                : { opacity: 0, y: 16, rotate: 0 }
            }
            transition={{
              opacity: { duration: reduceMotion ? 0.01 : 0.6, ease: 'easeOut' },
              y: { duration: reduceMotion ? 0.01 : 0.6, ease: 'easeOut' },
              rotate: {
                duration: pour,
                ease: [0.33, 0, 0.2, 1],
                ...(reduceMotion ? {} : { times: [0, 0.18, 1] }),
              },
            }}
          >
            <div style={{ position: 'relative', width: '100%' }}>
              <img
                src="/assets/teapot.png"
                alt=""
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  transform: 'scaleX(-1)',
                  filter: 'contrast(1.8) brightness(1.12) sepia(0.12)',
                }}
              />
              {/* Chai visible inside the pot body — drains as it pours */}
              <motion.div
                style={{
                  position: 'absolute',
                  left: '26%',
                  top: '32%',
                  width: '46%',
                  height: '46%',
                  background:
                    'radial-gradient(ellipse at 48% 45%, rgba(201,149,72,0.82), rgba(139,84,37,0.70), rgba(92,54,24,0.50))',
                  borderRadius: '48% 50% 46% 44%',
                  pointerEvents: 'none',
                  transformOrigin: 'center bottom',
                }}
                initial={false}
                animate={
                  teaOn
                    ? reduceMotion
                      ? { scaleY: 0.08, opacity: 0.12 }
                      : { scaleY: [1, 1, 0.08], opacity: [0.78, 0.78, 0.12] }
                    : { scaleY: 1, opacity: 0.78 }
                }
                transition={{
                  duration: pour,
                  ease: [0.33, 0, 0.2, 1],
                  ...(reduceMotion ? {} : { times: [0, 0.2, 1] }),
                }}
              />
            </div>
          </motion.div>

          {/* SVG scene: cup + saucer, chai fill, pour stream, steam */}
          <motion.div
            initial={false}
            animate={{ opacity: teaOn ? 1 : 0, y: teaOn ? 0 : 16 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.65, ease: 'easeOut' }}
          >
            <svg viewBox="0 0 400 210" className="intro-cin__tea-svg" aria-hidden>
              <defs>
                <linearGradient id={`${rid}-stream`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a06830" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6b3e1a" stopOpacity="0.55" />
                </linearGradient>
                <linearGradient id={`${rid}-cupChai`} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#5c3618" stopOpacity="0.92" />
                  <stop offset="100%" stopColor="#b07a3c" stopOpacity="0.55" />
                </linearGradient>
                <clipPath id={`${rid}-cupIn`}>
                  <path d="M 244 96 L 244 152 Q 244 164 258 164 L 310 164 Q 324 164 324 152 L 324 96 Z" />
                </clipPath>
              </defs>

              {/* ═══ ORNATE CUP + SAUCER — vintage engraved style ═══ */}

              {/* Saucer — layered ellipses with bead trim */}
              <ellipse cx="284" cy="174" rx="60" ry="11" fill="none" stroke={ink} strokeWidth="2.2" />
              <ellipse cx="284" cy="174" rx="52" ry="8" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.45" />
              <ellipse cx="284" cy="174" rx="44" ry="6" fill="none" stroke={ink} strokeWidth="0.6" opacity="0.3" />
              {/* Saucer bead dots */}
              <g fill={ink} stroke="none" opacity="0.35">
                {[...Array(12)].map((_, i) => {
                  const a = Math.PI * (0.08 + i * 0.07);
                  const cx = 284 + 56 * Math.cos(a);
                  const cy = 174 + 10 * Math.sin(a - Math.PI);
                  return <circle key={`sb${i}`} cx={cx} cy={cy} r="1.1" />;
                })}
              </g>

              {/* Cup body — vintage silhouette with double-line */}
              <path
                d="M 242 90 L 238 148 Q 238 166 258 166 L 310 166 Q 330 166 330 148 L 326 90"
                fill="none" stroke={ink} strokeWidth="2.5"
              />
              <path
                d="M 245 94 L 241 147 Q 242 162 258 163 L 310 163 Q 326 162 327 147 L 323 94"
                fill="none" stroke={ink} strokeWidth="0.8" opacity="0.4"
              />

              {/* Rim — thick top edge with inner line */}
              <line x1="238" y1="90" x2="330" y2="90" stroke={ink} strokeWidth="3.2" strokeLinecap="round" />
              <line x1="242" y1="93" x2="326" y2="93" stroke={ink} strokeWidth="0.8" opacity="0.45" />

              {/* Ornate handle — scroll curves */}
              <path d="M 330 100 Q 352 98 354 118 Q 354 138 340 142 Q 332 144 330 140"
                fill="none" stroke={ink} strokeWidth="2.2" />
              <path d="M 332 106 Q 348 105 349 118 Q 349 132 340 136"
                fill="none" stroke={ink} strokeWidth="0.9" opacity="0.45" />
              {/* Handle scroll end curls */}
              <path d="M 354 118 Q 358 114 356 108 Q 354 104 350 106"
                fill="none" stroke={ink} strokeWidth="0.7" opacity="0.4" />
              <path d="M 340 142 Q 336 146 338 150 Q 340 152 344 150"
                fill="none" stroke={ink} strokeWidth="0.7" opacity="0.4" />

              {/* Decorative band on cup body */}
              <path d="M 244 118 Q 284 112 324 118" stroke={ink} strokeWidth="1.1" fill="none" opacity="0.5" />
              <path d="M 244 124 Q 284 118 324 124" stroke={ink} strokeWidth="0.7" fill="none" opacity="0.35" />
              {/* Filigree ticks between bands */}
              <g stroke={ink} strokeWidth="0.7" opacity="0.35">
                <line x1="258" y1="118" x2="258" y2="124" />
                <line x1="272" y1="117" x2="272" y2="123" />
                <line x1="284" y1="116" x2="284" y2="122" />
                <line x1="296" y1="117" x2="296" y2="123" />
                <line x1="310" y1="118" x2="310" y2="124" />
              </g>

              {/* Central floral motif on cup face */}
              <g stroke={ink} fill="none" opacity="0.5" strokeWidth="0.85">
                <path d="M 284 144 C 278 136 278 128 284 124 C 290 128 290 136 284 144" />
                <path d="M 284 124 L 284 120" />
                <circle cx="284" cy="118" r="1.8" strokeWidth="0.7" />
                <path d="M 276 134 Q 272 130 274 126" />
                <path d="M 292 134 Q 296 130 294 126" />
              </g>

              {/* Cross-hatch corner shading */}
              <g stroke={ink} strokeWidth="0.35" opacity="0.16">
                <line x1="246" y1="96" x2="252" y2="102" />
                <line x1="246" y1="102" x2="252" y2="108" />
                <line x1="316" y1="96" x2="322" y2="102" />
                <line x1="316" y1="102" x2="322" y2="108" />
                <line x1="248" y1="150" x2="254" y2="156" />
                <line x1="314" y1="150" x2="320" y2="156" />
              </g>

              {/* Cup foot / base ring */}
              <path d="M 260 166 Q 284 172 308 166" stroke={ink} strokeWidth="1.4" fill="none" opacity="0.6" />
              <path d="M 264 168 Q 284 173 304 168" stroke={ink} strokeWidth="0.6" fill="none" opacity="0.35" />

              {/* Chai filling the cup */}
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

              {/* Chai stream — from flipped spout tip to cup rim */}
              <motion.path
                d="M 185 72 C 210 80 245 88 276 96 C 298 102 316 100 318 94"
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

              {/* Steam wisps — multiple curling tendrils */}
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
                <path d="M 290 80 Q 294 66 288 52 Q 284 40 292 28" fill="none" stroke={ink} strokeWidth="0.9" opacity="0.3">
                  <animate
                    attributeName="d"
                    dur="3s"
                    repeatCount="indefinite"
                    values="M 290 80 Q 294 66 288 52 Q 284 40 292 28;M 290 80 Q 286 64 294 50 Q 298 38 288 26;M 290 80 Q 294 66 288 52 Q 284 40 292 28"
                  />
                </path>
                <path d="M 280 82 Q 276 70 282 58" fill="none" stroke={ink} strokeWidth="0.7" opacity="0.25">
                  <animate
                    attributeName="d"
                    dur="2.2s"
                    repeatCount="indefinite"
                    values="M 280 82 Q 276 70 282 58;M 280 82 Q 284 68 278 56;M 280 82 Q 276 70 282 58"
                  />
                </path>
              </motion.g>
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
