"use client";

import Image from "next/image";
import { Check, LogIn } from "lucide-react";
import { type FormEvent, useState } from "react";

export default function LoginPage() {
  const [complete, setComplete] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComplete(true);
  };

  return (
    <main className="login-shell">
      <div className="login-visual">
        <Image src="/images/foundry-loft.jpg" alt="Illustrative Manchester loft interior" fill sizes="(max-width: 800px) 100vw, 50vw" />
        <div className="login-quote">
          <p className="eyebrow eyebrow-light">A quieter shortlist</p>
          <h1>Keep your thinking in one place.</h1>
        </div>
      </div>
      <div className="login-form-wrap">
        <div className="login-form">
          {complete ? (
            <div className="success-state" aria-live="polite">
              <span className="success-icon"><Check aria-hidden="true" /></span>
              <h2>Demo session ready.</h2>
              <p className="panel-copy">
                No account was created and no credentials were sent. Use saved homes to try the local-only experience.
              </p>
              <a className="button button-dark" href="/favorites">Open saved homes</a>
            </div>
          ) : (
            <>
              <p className="eyebrow">Demonstration only</p>
              <h2>Sign in to EstateHub</h2>
              <p className="panel-copy">Any valid email and eight-character password will show the local success state.</p>
              <form onSubmit={submit}>
                <label className="field"><span>Email</span><input type="email" required autoComplete="email" /></label>
                <label className="field"><span>Password</span><input type="password" required minLength={8} autoComplete="current-password" /></label>
                <button type="submit" className="button button-dark button-full"><LogIn size={17} aria-hidden="true" /> Enter demo</button>
                <p className="form-note">No authentication service is connected. Values are never submitted.</p>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
