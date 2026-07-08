import { useState, useRef } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inputRef = useRef(null);

  function reset() {
    setEmail("");
    setPassword("");
    setDisplayName("");
    setError("");
    setSuccess("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    setSubmitting(true);
    try {
      if (mode === "login") {
        await login(email.trim(), password);
        setSuccess("Logged in successfully!");
        setTimeout(onClose, 600);
      } else {
        await signup(email.trim(), password, displayName.trim());
        setSuccess("Account created!");
        setTimeout(onClose, 600);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose}>
          <FiX />
        </button>
        <h2>{mode === "login" ? "Welcome back" : "Create account"}</h2>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => {
              setMode("login");
              reset();
            }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => {
              setMode("signup");
              reset();
            }}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === "signup" && (
            <div className="auth-field">
              <label>Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                autoComplete="name"
              />
            </div>
          )}
          <div className="auth-field">
            <label>Email</label>
            <input
              ref={inputRef}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </div>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
            {submitting ? (mode === "login" ? "Logging in..." : "Creating...") : (mode === "login" ? "Login" : "Create Account")}
          </button>
        </form>

        <p className="auth-footnote">
          Demo app — passwords are stored locally in your browser.
        </p>
      </div>
    </div>
  );
}
