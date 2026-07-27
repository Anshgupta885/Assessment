import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function InputField({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const password = type === "password";

  return (
    <label className="field">
      <span>{label}</span>
      <div className="input-shell">
        <input type={password && show ? "text" : type} {...props} />
        {password && (
          <button
            className="icon-button"
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((value) => !value)}
          >
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </label>
  );
}
