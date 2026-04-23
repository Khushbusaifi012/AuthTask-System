import { useEffect } from "react";

export default function Toast({ open, message, variant = "success", onClose, duration = 2500 }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [open, duration, onClose]);

  if (!open) return null;

  const icon = variant === "success" ? "✓" : "✕";

  return (
    <div className={`toast toast-${variant}`} role="status" aria-live="polite">
      <div className={`toast-icon toast-icon-${variant}`} aria-hidden="true">
        {icon}
      </div>
      <div className="toast-msg">{message}</div>
    </div>
  );
}

