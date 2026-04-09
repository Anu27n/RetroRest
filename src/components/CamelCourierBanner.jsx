import { GiCamel } from 'react-icons/gi';
import { useEffect, useState } from 'react';

const MESSAGES = [
  '🐫 Open-Air Café • Grab Your Snacks/Beverages at the Counter',
  '🐫 Caravan Update: Every dish begins its journey fresh in our kitchen.',
  '🐫 Caravan Update: Good food takes a moment while spices come alive.',
  '🐫 Caravan Update: The kitchen caravan moves with care and craft.',
  '🐫 Caravan Update: Fresh chai and snacks are prepared one order at a time.',
  '🐫 Caravan Update: Flavours travel from our kitchen to you with care.',
  '🐫 Caravan Update: Khamma Ghani! Welcome to the Ancient Sip caravan — where every cup tells a story.',
];

const INTERVAL_MS = 8000; // Increased to give time for typewriter

export default function CamelCourierBanner({ active = true }) {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);
  const [visibleWords, setVisibleWords] = useState(0);

  const fullText = MESSAGES[index].replace(/^\s*🐫\s*/, '');
  const words = fullText.split(' ');

  useEffect(() => {
    if (!active) return;
    setVisibleWords(0);
    let count = 0;
    const wordTimer = setInterval(() => {
      count++;
      setVisibleWords(count);
      if (count >= words.length) clearInterval(wordTimer);
    }, 180); // Speed of word reveal

    return () => clearInterval(wordTimer);
  }, [index, words.length, active]);

  useEffect(() => {
    if (!active) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
      setTick((t) => t + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [active]);

  return (
    <div
      className="camel-banner"
      role="status"
      aria-live="polite"
      aria-label="Caravan updates from the kitchen"
    >
      <span key={`camel-${tick}`} className="camel-banner__icon-wrap" aria-hidden>
        <GiCamel className="camel-banner__icon-camel" />
      </span>
      <p key={`msg-${index}`} className="camel-banner__text">
        {words.map((word, i) => (
          <span
            key={i}
            className="typewriter-word"
            style={{
              opacity: i < visibleWords ? 1 : 0,
              transform: i < visibleWords ? 'translateY(0)' : 'translateY(4px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              display: 'inline-block',
              marginRight: '0.25em',
            }}
          >
            {word}
          </span>
        ))}
        {visibleWords < words.length && (
          <span
            className="typewriter-cursor"
            style={{
              display: 'inline-block',
              animation: 'blink-cursor 0.75s step-end infinite',
              borderRight: '2px solid var(--color-ink)',
              marginLeft: '2px',
              height: '1em',
              verticalAlign: 'text-bottom',
            }}
          />
        )}
      </p>
    </div>
  );
}
