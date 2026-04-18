import { useState, useRef, useEffect } from "react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

const flags: Record<string, string> = {
  ge: "🇬🇪",
  en: "🇬🇧",
  de: "🇩🇪",
  ru: "🇷🇺",
};

const labels: Record<string, string> = {
  ge: "ქართული",
  en: "English",
  de: "Deutsch",
  ru: "Русский",
};

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const langs = ["ge", "en", "de", "ru"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-2 text-xs font-bold uppercase tracking-wider text-foreground transition-all hover:bg-secondary border border-white/5"
      >
        <span className="text-base">{flags[language] || "🌐"}</span>
        <span>{language}</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 opacity-60 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-xl border border-white/10 bg-card shadow-2xl animate-fade-in z-50">
          <div className="flex flex-col p-1">
            {langs.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang as Language);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[11px] font-bold uppercase transition-all ${
                  language === lang
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span>{flags[lang]}</span>
                <span className="flex-1">{labels[lang]}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
