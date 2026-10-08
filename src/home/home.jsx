import { Link } from 'react-router-dom';
import welcomeImg from '../assets/welcome.png';

export function Home() {
  return (
    <main className="container py-4">
      <section className="page-intro">
        <h1>Welcome</h1>
        <p className="intro">
          Fractal Skip Hub is a crowdsourced Guild Wars 2 resource for fractal
          routes and skip strategies. Players share what works, vote on useful
          tips, and help the community clear fractals faster.
        </p>
        <p>
          Looking for fight-specific gear? Use the Gear page to find recommended
          sigils and relics for fractals and raids based on your profession and role.
        </p>
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
                Browse community skip routes, submit new strategies, and see live
                updates as tips are posted.
              </p>
            </div>
          </article>
          <article className="feature-card card h-100">
            <div className="card-body">
              <h3 className="card-title">
                <Link to="/gear">Gear</Link>
              </h3>
              <p className="card-text">
                Look up recommended sigils and relics by profession, role, and
                fight, with item details from the Guild Wars 2 API.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mt-5">
        <h2>How it will work</h2>
        <p>
          Authenticated players will submit skip notes tied to a fractal. Everyone
          else can browse those tips and upvote the ones that actually save time.
          Daily fractal info and item details will come from the official Guild Wars 2
          API, and new submissions will show up for connected users over WebSocket
          without a page refresh.
        </p>
        <p>
          <em>Placeholder note — login, database, API, and live updates are not wired up yet.</em>
        </p>
      </section>
    </main>
  );
}
