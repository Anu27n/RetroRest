import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const CONTACTS = {
  phone: '7985646283',
  emailPrimary: 'healthyhub6666@gmail.com',
  emailSecondary: 'Healthyhubcafe@gmail.com',
};

export default function GrievanceMenu({ visible = true }) {
  const [open, setOpen] = useState(false);
  const [kind, setKind] = useState('feedback');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!visible) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setName('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 2600);
  };

  return (
    <>
      <button
        type="button"
        className="grievance-menu__toggle"
        aria-label="Open grievance menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <GiHamburgerMenu />
      </button>

      {open && (
        <div className="grievance-menu__overlay" role="dialog" aria-label="Grievance panel">
          <div className="grievance-menu__panel">
            <div className="grievance-menu__head">
              <h2>Grievance</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close grievance menu">
                Close
              </button>
            </div>

            <form className="grievance-menu__form" onSubmit={handleSubmit}>
              <div className="grievance-menu__row">
                <button
                  type="button"
                  className={kind === 'feedback' ? 'is-active' : ''}
                  onClick={() => setKind('feedback')}
                >
                  Feedback
                </button>
                <button
                  type="button"
                  className={kind === 'complaint' ? 'is-active' : ''}
                  onClick={() => setKind('complaint')}
                >
                  Complaint
                </button>
              </div>

              <input
                className="grievance-menu__input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
              />
              <textarea
                className="grievance-menu__textarea"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Write your ${kind} here...`}
                required
              />
              <button type="submit" className="grievance-menu__submit">
                Submit
              </button>
              {submitted && (
                <p className="grievance-menu__ack">
                  Thank you. Your {kind} has been noted.
                </p>
              )}
            </form>

            <div className="grievance-menu__contact">
              <p>Grievance Officer</p>
              <a href={`tel:${CONTACTS.phone}`}>Phone: {CONTACTS.phone}</a>
              <a href={`mailto:${CONTACTS.emailPrimary}`}>Email: {CONTACTS.emailPrimary}</a>
              <a href={`mailto:${CONTACTS.emailSecondary}`}>Email: {CONTACTS.emailSecondary}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
