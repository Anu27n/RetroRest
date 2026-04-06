import { useEffect, useState } from 'react';

const MESSAGES = [
  '🐫 Camel Courier Notice: Our kitchen caravan has only two riders today. Orders may take a little longer.',
  '🐫 Small kitchen, big flavours. Just two of us preparing everything fresh.',
  '🐫 No seating yet in this tiny haveli, but the food is worth the wait.',
  '🐫 Two cooks, one kitchen, and lots of chai. Thanks for your patience.',
];

const INTERVAL_MS = 7000;

export default function CamelCourierBanner() {
  const [index, setIndex] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
      setTick((t) => t + 1);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const body = MESSAGES[index].replace(/^\s*🐫\s*/, '');

  return (
    <div
      className="camel-banner"
      role="status"
      aria-live="polite"
      aria-label="Friendly café notice"
    >
      <span key={`camel-${tick}`} className="camel-banner__icon" aria-hidden>
        🐫
      </span>
      <p key={`msg-${index}`} className="camel-banner__text">
        {body}
      </p>
    </div>
  );
}
