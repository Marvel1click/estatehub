import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="section shell">
      <div className="empty-state">
        <span className="empty-icon"><Home aria-hidden="true" /></span>
        <p className="eyebrow">404</p>
        <h1>That page has moved on.</h1>
        <p>The route does not exist in this illustrative EstateHub experience.</p>
        <Link href="/" className="button button-dark"><ArrowLeft size={16} aria-hidden="true" /> Back to discovery</Link>
      </div>
    </main>
  );
}
