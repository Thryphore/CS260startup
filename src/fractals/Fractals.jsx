import { useEffect, useState } from 'react';
import fractalsImg from '@/assets/fractals.png';
import { useAuth } from '@/auth/AuthContext';
import { FRACTAL_NAMES } from '@/data/fractals';
import { addSkip, getSkips, upvoteSkip } from '@/services/skipService';

const PEER_ACTIONS = ['submitted a skip for', 'upvoted a tip on', 'shared a route for'];

export function Fractals() {
  const { user } = useAuth();
  const [skips, setSkips] = useState([]);
  const [liveFeed, setLiveFeed] = useState([]);
  const [fractal, setFractal] = useState(FRACTAL_NAMES[0]);
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [voteMessage, setVoteMessage] = useState('');

  useEffect(() => {
    let cancelled = false;
    getSkips()
      .then((rows) => {
        if (!cancelled) setSkips(rows);
      })
      .catch(() => {
        if (!cancelled) setVoteMessage('Could not load skips from the service.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Simulate WebSocket peer activity until a real socket is added
    const intervalId = setInterval(() => {
      const peer = `Player-${Math.floor(Math.random() * 100)}`;
      const action = PEER_ACTIONS[Math.floor(Math.random() * PEER_ACTIONS.length)];
      const fractalName = FRACTAL_NAMES[Math.floor(Math.random() * FRACTAL_NAMES.length)];
      const entry = {
        id: `live-${Date.now()}`,
        text: `${peer} ${action} ${fractalName}`,
        at: new Date().toLocaleTimeString(),
      };
      setLiveFeed((prev) => [entry, ...prev].slice(0, 8));
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setFormMessage('');

    if (!user) {
      setFormError('Sign in to submit a skip.');
      return;
    }
    if (!title.trim() || !notes.trim()) {
      setFormError('Title and notes are required.');
      return;
    }

    const result = await addSkip({ fractal, title, notes });
    if (!result.ok) {
      setFormError(result.error);
      if (result.skips.length) setSkips(result.skips);
      return;
    }
    setSkips(result.skips);
    setLiveFeed((prev) => [
      {
        id: `local-${Date.now()}`,
        text: `You submitted a skip for ${fractal}`,
        at: new Date().toLocaleTimeString(),
      },
      ...prev,
    ].slice(0, 8));
    setTitle('');
    setNotes('');
    setFormMessage('Skip submitted.');
  }

  async function handleUpvote(skipId) {
    setVoteMessage('');
    if (!user) {
      setVoteMessage('Sign in to upvote skips.');
      return;
    }
    const result = await upvoteSkip(skipId);
    if (result.skips.length) setSkips(result.skips);
    setVoteMessage(result.ok ? 'Vote recorded.' : result.error);
  }

  return (
    <main className="container py-4">
      <section className="page-intro">
        <h1>Fractal Skips</h1>
        <p className="intro">
          Browse and contribute crowd-sourced skip routes for Mistlock Sanctuary
          fractals. Tips are loaded from the service and update live as activity
          appears in the feed below.
        </p>
        <figure className="hero-frame">
          <img src={fractalsImg} alt="Crystalline fractal platforms over mist" />
        </figure>
      </section>

      <section className="mt-5">
        <h2>Live updates</h2>
        <p>
          Simulated WebSocket feed — peer messages arrive on an interval until a
          real socket is connected.
        </p>
        <ul className="notification list-group">
          {liveFeed.length === 0 && (
            <li className="list-group-item">
              <em>Waiting for live activity…</em>
            </li>
          )}
          {liveFeed.map((entry) => (
            <li className="list-group-item" key={entry.id}>
              <span className="live-time">{entry.at}</span> {entry.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-5">
        <h2>Submit a skip</h2>
        {!user && (
          <p>
            <em>Sign in to enable the submission form.</em>
          </p>
        )}
        {formError && <p className="form-feedback form-feedback-error">{formError}</p>}
        {formMessage && <p className="form-feedback form-feedback-ok">{formMessage}</p>}
        <form className="lookup-form panel" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label" htmlFor="fractal">
              Fractal
            </label>
            <select
              className="form-select"
              id="fractal"
              value={fractal}
              onChange={(e) => setFractal(e.target.value)}
              disabled={!user}
            >
              {FRACTAL_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="skip-title">
              Title
            </label>
            <input
              className="form-control"
              type="text"
              id="skip-title"
              placeholder="Short name for the skip"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!user}
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="skip-notes">
              Notes
            </label>
            <textarea
              className="form-control"
              id="skip-notes"
              rows={4}
              placeholder="Describe the route, timing, and any gear swaps"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={!user}
            ></textarea>
          </div>
          <button className="btn btn-mist" type="submit" disabled={!user}>
            Submit skip
          </button>
        </form>
      </section>

      <section className="mt-5">
        <h2>Skips from the database</h2>
        <p>
          Seed tips plus anything you submit are kept by the service until it restarts.
        </p>
        {voteMessage && <p className="form-feedback">{voteMessage}</p>}
        <div className="table-responsive">
          <table className="table table-hover mist-table">
            <thead>
              <tr>
                <th>Fractal</th>
                <th>Skip</th>
                <th>Submitted by</th>
                <th>Votes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {skips.map((skip) => (
                <tr key={skip.id}>
                  <td>{skip.fractal}</td>
                  <td>
                    <strong>{skip.title}</strong>
                    <div className="skip-notes">{skip.notes}</div>
                  </td>
                  <td>{skip.submittedBy}</td>
                  <td>{skip.votes}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-mist-ghost"
                      onClick={() => handleUpvote(skip.id)}
                      disabled={!user}
                    >
                      Upvote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
