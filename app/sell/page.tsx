"use client";

import { Check, Home, LockKeyhole } from "lucide-react";
import { type FormEvent, useState } from "react";
import DemoNotice from "@/components/DemoNotice";

export default function SellPage() {
  const [complete, setComplete] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setComplete(true);
  };

  return (
    <main>
      <section className="page-hero compact-hero">
        <div className="shell">
          <p className="eyebrow">Demo valuation journey</p>
          <h1>Start with the home you know.</h1>
          <p className="page-intro">
            Preview a calm, transparent valuation request. No address or contact information leaves this page.
          </p>
          <DemoNotice compact />
        </div>
      </section>

      <section className="section shell">
        <div className="page-grid">
          <div className="panel">
            {complete ? (
              <div className="success-state" aria-live="polite">
                <span className="success-icon"><Check aria-hidden="true" /></span>
                <h2>Demo request complete.</h2>
                <p className="panel-copy">
                  This is the confirmation a real product might show. EstateHub has not stored, valued or sent any
                  details.
                </p>
                <button type="button" className="button button-dark" onClick={() => setComplete(false)}>Start again</button>
              </div>
            ) : (
              <>
                <p className="eyebrow">Step 1 of 1</p>
                <h2>Tell us about the home</h2>
                <form onSubmit={submit}>
                  <div className="form-grid">
                    <label className="field span-two">
                      <span>Illustrative postcode</span>
                      <input name="postcode" required pattern="[A-Za-z0-9 ]{5,9}" placeholder="e.g. N1 2AB" autoComplete="postal-code" />
                    </label>
                    <label className="field">
                      <span>Property type</span>
                      <select name="type" required defaultValue="">
                        <option value="" disabled>Select type</option>
                        <option>House</option><option>Apartment</option><option>Cottage</option>
                      </select>
                    </label>
                    <label className="field">
                      <span>Bedrooms</span>
                      <select name="bedrooms" required defaultValue="">
                        <option value="" disabled>Select bedrooms</option>
                        {[1,2,3,4,5].map((value) => <option key={value}>{value}{value === 5 ? "+" : ""}</option>)}
                      </select>
                    </label>
                    <label className="field">
                      <span>Name</span>
                      <input name="name" required autoComplete="name" />
                    </label>
                    <label className="field">
                      <span>Email</span>
                      <input name="email" type="email" required autoComplete="email" />
                    </label>
                  </div>
                  <button type="submit" className="button button-dark button-full">Show demo valuation confirmation</button>
                  <p className="form-note">Client-side demo only. The form performs no network request.</p>
                </form>
              </>
            )}
          </div>
          <aside className="panel">
            <span className="trust-icon"><Home aria-hidden="true" /></span>
            <h2>A useful first conversation.</h2>
            <p className="panel-copy">
              A real valuation would need a qualified professional, current comparables and a visit to the property.
              EstateHub makes none of those claims in this demo.
            </p>
            <div className="trust-item">
              <span className="trust-icon"><LockKeyhole size={19} aria-hidden="true" /></span>
              <div><strong>No transmission</strong><p>Your inputs remain local and are discarded on refresh.</p></div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
