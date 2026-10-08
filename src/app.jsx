import { useContext } from 'react';
import {
  createBrowserRouter,
  NavLink,
  Outlet,
  RouterProvider,
  useMatches,
} from 'react-router-dom';
import SelectableContext from '@restart/ui/SelectableContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarContext from 'react-bootstrap/esm/NavbarContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app.css';
import brandIcon from '@/assets/favicon.svg';
import { Home } from '@/home/Home';
import { Fractals } from '@/fractals/Fractals';
import { Gear } from '@/gear/Gear';
import { LoginModal } from '@/login/LoginModal';
import { NotFound } from '@/notfound/NotFound';
import { useDocumentTitle } from '@/useDocumentTitle';

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
  return (
    <Navbar expand="lg" variant="" collapseOnSelect>
      <Container>
        <BrandLink>
          <span className="brand-mark" aria-hidden="true">
            <img className="brand-icon" src={brandIcon} alt="" />
          </span>
          <span className="brand-text">
            <span className="brand-kicker">Guild Wars 2</span>
            <span className="brand-name">Fractal Skip Hub</span>
          </span>
        </BrandLink>
        <MenuToggle />
        <Navbar.Collapse id="site-nav">
          <Nav className="me-auto" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/" end eventKey="home">
                Home
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/fractals" eventKey="fractals">
                Fractal Skips
              </Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={NavLink} to="/gear" eventKey="gear">
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

function BrandLink({ children }) {
  const onSelect = useContext(SelectableContext);

  return (
    <Navbar.Brand
      as={NavLink}
      to="/"
      end
      onClick={(event) => {
        onSelect?.('brand', event);
      }}
    >
      {children}
    </Navbar.Brand>
  );
}

function MenuToggle() {
  const { expanded } = useContext(NavbarContext) || {};

  return <Navbar.Toggle aria-controls="site-nav" aria-expanded={!!expanded} />;
}
