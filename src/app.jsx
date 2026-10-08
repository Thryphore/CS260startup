import React from 'react';
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useLocation,
  useMatches,
} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import brandIcon from './assets/favicon.svg';
import { Home } from './home/home';
import { Fractals } from './fractals/fractals';
import { Gear } from './gear/gear';
import { LoginModal } from './login/LoginModal';
import { NotFound } from './notfound/NotFound';
import { useDocumentTitle } from './useDocumentTitle';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home />, handle: { title: 'Fractal Skip Hub' } },
      { path: '/fractals', element: <Fractals />, handle: { title: 'Fractal Skips' } },
      { path: '/gear', element: <Gear />, handle: { title: 'Gear Recommendations' } },
      { path: '*', element: <NotFound />, handle: { title: 'Fractal Skip Hub' } },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

function AppLayout() {
  return (
    <>
      <DocumentTitle />
      <header className="site-header">
        <SiteNav />
      </header>
      <Outlet />
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
    </>
  );
}

function DocumentTitle() {
  const matches = useMatches();
  const title = matches.findLast((match) => match.handle?.title)?.handle.title ?? 'Fractal Skip Hub';
  useDocumentTitle(title);
  return null;
}

function SiteNav() {
  const [navOpen, setNavOpen] = React.useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <Navbar expand="lg" variant="" expanded={navOpen} onToggle={setNavOpen} collapseOnSelect>
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
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
          <Nav className="me-auto" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/fractals">
                Fractal Skips
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/gear">
                Gear
              </Nav.Link>
            </Nav.Item>
          </Nav>
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
  );
}
