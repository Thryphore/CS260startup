import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function LoginModal() {
  const [show, setShow] = React.useState(false);

  return (
    <>
      <Button
        variant="mist"
        size="sm"
        className="btn-signin"
        type="button"
        onClick={() => setShow(true)}
      >
        Sign in
      </Button>
      <Modal show={show} onHide={() => setShow(false)} centered aria-labelledby="login-title">
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
    </>
  );
}
