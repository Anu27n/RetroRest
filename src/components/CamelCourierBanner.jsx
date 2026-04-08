import { useEffect, useState } from 'react';

const MESSAGES = [
  '🐫 Caravan Update: Every dish begins its journey fresh in our kitchen.',
  '🐫 Caravan Update: Good food takes a moment while spices come alive.',
  '🐫 Caravan Update: The kitchen caravan moves with care and craft.',
  '🐫 Caravan Update: Fresh chai and snacks are prepared one order at a time.',
  '🐫 Caravan Update: Flavours travel from our kitchen to you with care.',
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
      aria-label="Caravan updates from the kitchen"
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
