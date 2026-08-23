"use client";

import { ArrowRight, Check, MapPin } from "lucide-react";
import { type FormEvent, useCallback, useState } from "react";
import DemoNotice from "@/components/DemoNotice";
import Modal from "@/components/Modal";
import { agents, type Agent } from "@/lib/data";

export default function AgentsPage() {
  const [selected, setSelected] = useState<Agent | null>(null);
  const [sent, setSent] = useState(false);
  const close = useCallback(() => {
    setSelected(null);
    setSent(false);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <section className="page-hero">
        <div className="shell">
          <p className="eyebrow">Fictional local guide profiles</p>
          <h1>Start with someone who knows the shape of a move.</h1>
          <p className="page-intro">
            Meet three illustrative profiles designed to demonstrate a transparent, low-pressure introduction flow.
          </p>
          <DemoNotice compact />
        </div>
      </section>

      <section className="section shell">
        <div className="agent-grid">
          {agents.map((agent) => (
            <article key={agent.id} className="agent-card">
              <span className="agent-avatar" style={{ backgroundColor: agent.color }}>{agent.initials}</span>
              <h2>{agent.name}</h2>
              <p className="agent-area"><MapPin size={14} aria-hidden="true" /> {agent.area}</p>
              <p className="agent-focus">{agent.focus}</p>
              <p className="agent-note">{agent.note}</p>
              <button type="button" className="button button-outline button-full" onClick={() => setSelected(agent)}>
                Try introduction flow <ArrowRight size={16} aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      </section>

      <Modal
        open={Boolean(selected)}
        onClose={close}
        eyebrow="Client-side demo"
        title={sent ? "Introduction noted" : `Meet ${selected?.name ?? "a local guide"}`}
      >
        {sent ? (
          <div className="success-state">
            <span className="success-icon"><Check aria-hidden="true" /></span>
            <h2>Nothing was sent.</h2>
            <p className="panel-copy">
              This confirmation demonstrates the finished product state. Your form details stayed in this browser.
            </p>
            <button type="button" className="button button-dark" onClick={close}>Close</button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="panel-copy">
              Share enough context to preview the interaction. EstateHub will not transmit or store it.
            </p>
            <div className="form-grid">
              <label className="field"><span>Name</span><input name="name" autoComplete="name" required /></label>
              <label className="field"><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
              <label className="field span-two">
                <span>What are you considering?</span>
                <textarea name="message" required minLength={12} placeholder="For example: a move later this year…" />
              </label>
            </div>
            <button type="submit" className="button button-dark button-full">Show confirmation</button>
            <p className="form-note">Demo only — this form has no network submission.</p>
          </form>
        )}
      </Modal>
    </main>
  );
}
