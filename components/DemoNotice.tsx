import { Info } from "lucide-react";

export default function DemoNotice({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "demo-notice demo-notice-compact" : "demo-notice"} role="note">
      <Info aria-hidden="true" size={16} />
      <p>
        <strong>Illustrative demo.</strong> Properties, people, prices and responses on this site are fictional.
      </p>
    </div>
  );
}
