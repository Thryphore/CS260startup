import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAuth } from '@/auth/AuthContext';

export function LoginModal() {
  const { user, login, createAccount, logout } = useAuth();
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState('');

  function resetForm() {
    setEmail('');
    setPassword('');
    setError('');
    setMessage('');
  }

  function handleClose() {
    setShow(false);
    resetForm();
  }

  async function handleLogin(event) {
    event.preventDefault();
    const result = await login(email, password);
    if (!result.ok) {
      setError(result.error);
      setMessage('');
      return;
    }
    handleClose();
  }

  async function handleCreate(event) {
    event.preventDefault();
    const result = await createAccount(email, password);
    if (!result.ok) {
      setError(result.error);
      setMessage('');
      return;
    }
    setMessage(`Welcome, ${result.user.username}! Account created.`);
    setError('');
    setTimeout(handleClose, 600);
  }

  if (user) {
    return (
      <Button
        variant="mist"
        size="sm"
        className="btn-signin"
        type="button"
        onClick={logout}
      >
        Sign out
      </Button>
    );
  }

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
      <Modal show={show} onHide={handleClose} centered aria-labelledby="login-title">
        <Modal.Header closeButton>
          <Modal.Title as="h2" id="login-title">
            Sign in
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Create an account or sign in to submit skips and upvote tips. The service
            stores a hashed password and keeps you signed in with an auth cookie.
          </p>
          {error && <p className="form-feedback form-feedback-error">{error}</p>}
          {message && <p className="form-feedback form-feedback-ok">{message}</p>}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text">@</span>
                <input
                  id="email"
                  className="form-control"
                  type="email"
                  autoComplete="username"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  autoComplete="current-password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="login-actions">
              <Button variant="mist" type="submit">
                Login
              </Button>
              <Button
                className="btn-mist-ghost"
                variant="mist-ghost"
                type="button"
                onClick={handleCreate}
              >
                Create
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
