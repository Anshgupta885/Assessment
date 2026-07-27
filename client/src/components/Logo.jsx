import { ShieldCheck } from "lucide-react";

export default function Logo() {
  return (
    <div className="brand">
      <span className="brand-mark"><ShieldCheck size={18} strokeWidth={2.2} /></span>
      <span>Authflow</span>
    </div>
  );
}
