import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import brandIcon from './assets/favicon.svg';
import { Home } from './home/home';
import { Fractals } from './fractals/fractals';
import { Gear } from './gear/gear';
import { LoginModal } from './login/LoginModal';
import { useDocumentTitle } from './useDocumentTitle';

export default function App() {
  const [navOpen, setNavOpen] = React.useState(false);

  function closeNav() {
    setNavOpen(false);
  }

  return (
    <BrowserRouter>
      <header className="site-header">
        <Navbar expand="lg" variant="" expanded={navOpen} onToggle={setNavOpen}>
          <Container>
            <Navbar.Brand as={NavLink} to="/" end onClick={closeNav}>
              <span className="brand-mark" aria-hidden="true">
                <img className="brand-icon" src={brandIcon} alt="" />
              </span>
              <span className="brand-text">
                <span className="brand-kicker">Guild Wars 2</span>
                <span className="brand-name">Fractal Skip Hub</span>
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="site-nav" aria-expanded={navOpen} />
            <Navbar.Collapse id="site-nav">
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
                <LoginModal />
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
    </BrowserRouter>
  );
}

function NotFound() {
  useDocumentTitle('Fractal Skip Hub');

  return <main className="container py-4">404: Return to sender. Address unknown.</main>;
}
