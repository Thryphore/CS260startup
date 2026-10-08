import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { Home } from './home/home';
import { Fractals } from './fractals/fractals';
import { Gear } from './gear/gear';

export default function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [navOpen, setNavOpen] = React.useState(false);

  function closeNav() {
    setNavOpen(false);
  }

  return (
    <BrowserRouter>
      <header className="site-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <NavLink className="navbar-brand" to="/" end onClick={closeNav}>
              <span className="brand-mark" aria-hidden="true">
                <img className="brand-icon" src="/favicon.svg" alt="" />
              </span>
              <span className="brand-text">
                <span className="brand-kicker">Guild Wars 2</span>
                <span className="brand-name">Fractal Skip Hub</span>
              </span>
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              aria-controls="site-nav"
              aria-expanded={navOpen}
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((open) => !open)}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`} id="site-nav">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/" end onClick={closeNav}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/fractals" onClick={closeNav}>
                    Fractal Skips
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/gear" onClick={closeNav}>
                    Gear
                  </NavLink>
                </li>
              </ul>
              <div className="user">
                <div className="user-chip">
                  <div className="user-meta">
                    <span className="user-label">Username</span>
                    <span className="username">
                      <em>Placeholder — not logged in</em>
                    </span>
                  </div>
                </div>
                <Button
                  variant="mist"
                  size="sm"
                  className="btn-signin"
                  type="button"
                  onClick={() => setShowLogin(true)}
                >
                  Sign in
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fractals" element={<Fractals />} />
        <Route path="/gear" element={<Gear />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-inner">
            <a href="https://github.com/Thryphore">GitHub</a>
            <span>
              <span className="footer-label">IGN:</span>Navi.5047
            </span>
            <span>
              <span className="footer-label">Another project:</span>
              <a href="https://thryphore.github.io/wvw-pip-tally/">WvW Pip Tally</a>
            </span>
          </div>
        </div>
      </footer>

      <Modal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        centered
        aria-labelledby="login-title"
      >
        <Modal.Header closeButton>
          <Modal.Title as="h2" id="login-title">
            Sign in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <em>Placeholder — authentication is not implemented yet.</em> Sign in will later let you
            submit skips, rate tips, and save gear preferences.
          </p>
          <form className="login-form" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  id="email"
                  className="form-control"
                  type="text"
                  placeholder="email (placeholder)"
                  disabled
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text">🔒</span>
                <input
                  id="password"
                  className="form-control"
                  type="password"
                  placeholder="password (placeholder)"
                  disabled
                />
              </div>
            </div>
            <div className="login-actions">
              <Button variant="mist" type="submit" disabled>
                Login (placeholder)
              </Button>
              <Button className="btn-mist-ghost" variant="mist-ghost" type="submit" disabled>
                Create (placeholder)
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </BrowserRouter>
  );
}

function NotFound() {
  return <main className="container py-4">404: Return to sender. Address unknown.</main>;
}
