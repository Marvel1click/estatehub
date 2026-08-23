"use client";

import { Calculator, Info } from "lucide-react";
import { useMemo, useState } from "react";
import DemoNotice from "@/components/DemoNotice";
import { formatPrice } from "@/lib/data";

const calculatePayment = (principal: number, annualRate: number, years: number) => {
  if (principal <= 0 || years <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;
  if (monthlyRate === 0) return principal / payments;
  return principal * (monthlyRate * (1 + monthlyRate) ** payments) / ((1 + monthlyRate) ** payments - 1);
};

export default function MortgagePage() {
  const [price, setPrice] = useState(795000);
  const [deposit, setDeposit] = useState(160000);
  const [rate, setRate] = useState(4.6);
  const [term, setTerm] = useState(25);
  const loan = Math.max(price - deposit, 0);
  const monthly = useMemo(() => calculatePayment(loan, rate, term), [loan, rate, term]);
  const total = monthly * term * 12;

  return (
    <main>
      <section className="page-hero compact-hero">
        <div className="shell">
          <p className="eyebrow">Illustrative planning tool</p>
          <h1>Model the monthly shape of a move.</h1>
          <p className="page-intro">
            Adjust a few simple assumptions to explore an example repayment—not a quote or financial advice.
          </p>
          <DemoNotice compact />
        </div>
      </section>

      <section className="section shell">
        <div className="calculator-layout">
          <div className="panel">
            <p className="eyebrow">Your assumptions</p>
            <h2>Mortgage inputs</h2>
            <div className="form-grid">
              <label className="field">
                <span>Illustrative home price</span>
                <input type="number" min={100000} step={5000} value={price} onChange={(e) => setPrice(Number(e.target.value))} />
              </label>
              <label className="field">
                <span>Deposit</span>
                <input type="number" min={0} max={price} step={5000} value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} />
              </label>
              <label className="field">
                <span>Interest rate (%)</span>
                <input type="number" min={0} max={15} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} />
              </label>
              <label className="field">
                <span>Term</span>
                <select value={term} onChange={(e) => setTerm(Number(e.target.value))}>
                  {[15, 20, 25, 30, 35].map((years) => <option value={years} key={years}>{years} years</option>)}
                </select>
              </label>
            </div>
            <p className="form-note"><Info size={14} aria-hidden="true" /> Values stay in this browser and reset when the page reloads.</p>
          </div>
          <div className="panel calculator-result" aria-live="polite">
            <Calculator aria-hidden="true" />
            <p className="result-kicker">Illustrative monthly repayment</p>
            <p className="result-value">{formatPrice(Math.round(monthly))}<small> / month</small></p>
            <div className="result-grid">
              <div><span>Loan amount</span><strong>{formatPrice(loan)}</strong></div>
              <div><span>Deposit share</span><strong>{price ? Math.min(100, (deposit / price) * 100).toFixed(1) : 0}%</strong></div>
              <div><span>Example total repaid</span><strong>{formatPrice(Math.round(total))}</strong></div>
              <div><span>Example interest</span><strong>{formatPrice(Math.max(0, Math.round(total - loan)))}</strong></div>
            </div>
            <p className="disclaimer">
              This simplified capital-and-interest calculation excludes fees, taxes, insurance, affordability checks,
              changing rates and lender criteria. It is not a recommendation, quote or financial advice.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
