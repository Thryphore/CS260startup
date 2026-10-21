import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import welcomeImg from '@/assets/welcome.png';
import { useAuth } from '@/auth/AuthContext';
import { getDailyFractals } from '@/services/gw2Api';

export function Home() {
  const { user } = useAuth();
  const [dailies, setDailies] = useState(null);

  useEffect(() => {
    // Mocked third-party daily fractal payload
    setDailies(getDailyFractals());
  }, []);

  return (
    <main className="container py-4">
      <section className="page-intro">
        <h1>Welcome{user ? `, ${user.username}` : ''}</h1>
        <p className="intro">
          Fractal Skip Hub is a crowdsourced Guild Wars 2 resource for fractal
          routes and skip strategies. Players share what works, vote on useful
          tips, and help the community clear fractals faster.
        </p>
        <p>
          Looking for fight-specific gear? Use the Gear page to find recommended
          sigils and potions for fractals based on the Discretize cheat sheet.
        </p>
        {dailies && (
          <p className="daily-banner">
            <strong>Daily fractals (mocked):</strong> {dailies.fractals.join(', ')}
          </p>
        )}
        <figure className="hero-frame">
          <img src={welcomeImg} alt="Misty fractal sanctuary observatory" />
        </figure>
      </section>

      <section className="mt-5">
        <h2>What you can do here</h2>
        <div className="feature-grid">
          <article className="feature-card card h-100">
            <div className="card-body">
              <h3 className="card-title">
                <Link to="/fractals">Fractal Skips</Link>
              </h3>
              <p className="card-text">
                Browse community skip routes, submit new strategies when signed in,
                upvote tips, and watch a live activity feed.
              </p>
            </div>
          </article>
          <article className="feature-card card h-100">
            <div className="card-body">
              <h3 className="card-title">
                <Link to="/gear">Gear</Link>
              </h3>
              <p className="card-text">
                Look up recommended sigils and potions by profession, role, and
                fight, with mocked Guild Wars 2 API item details.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-5">
        <h2>How it works right now</h2>
        <p>
          Sign in stores your account in localStorage. Skip submissions and votes
          persist in the same browser. Gear recommendations are hard-coded from the
          Discretize cheat sheet, and the live feed on Fractal Skips uses{' '}
          <code>setInterval</code> to stand in for WebSocket messages until the
          backend is ready.
        </p>
      </section>
    </main>
  );
}
