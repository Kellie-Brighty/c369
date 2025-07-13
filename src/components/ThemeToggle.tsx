import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  onChange: () => void;
}

const ThemeToggle = ({ isDark, onChange }: ThemeToggleProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onChange();
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={handleClick}
      className={`relative w-14 h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${
        isDark ? "bg-brand-red" : "bg-gray-200"
      }`}
    >
      <span className="sr-only">{isDark ? "Dark" : "Light"} mode</span>
      <div
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm transform transition-transform duration-200 ${
          isDark ? "translate-x-7" : "translate-x-0"
        } flex items-center justify-center`}
      >
        {isDark ? (
          <Moon size={14} className="text-brand-red" />
        ) : (
          <Sun size={14} className="text-brand-red" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;
