import { useEffect } from "react";
import { FiCheckCircle, FiInfo } from "react-icons/fi";

export default function Toast({ message, type = "success", onClose, darkMode }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 animate-toast">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-xl ${
          darkMode
            ? "bg-slate-900/90 border-slate-700/60 text-white"
            : "bg-white/95 border-slate-200 text-slate-800"
        }`}
      >
        {type === "success" ? (
          <FiCheckCircle className="text-emerald-500 text-lg shrink-0 animate-bounce" />
        ) : (
          <FiInfo className="text-blue-500 text-lg shrink-0" />
        )}
        <span className="text-sm font-medium">{message}</span>
      </div>
    </div>
  );
}
