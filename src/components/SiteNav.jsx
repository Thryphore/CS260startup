import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavbarContext from 'react-bootstrap/esm/NavbarContext';
import brandIcon from '@/assets/favicon.svg';
import { LoginModal } from '@/login/LoginModal';

export function SiteNav() {
  return (
    <Navbar expand="lg" variant="" collapseOnSelect>
      <Container>
        <Nav.Link as={NavLink} to="/" end eventKey="brand" bsPrefix="navbar-brand">
          <span className="brand-mark" aria-hidden="true">
            <img className="brand-icon" src={brandIcon} alt="" />
          </span>
          <span className="brand-text">
            <span className="brand-kicker">Guild Wars 2</span>
            <span className="brand-name">Fractal Skip Hub</span>
          </span>
        </Nav.Link>
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

function MenuToggle() {
  const { expanded } = useContext(NavbarContext) || {};

  return <Navbar.Toggle aria-controls="site-nav" aria-expanded={!!expanded} />;
}
