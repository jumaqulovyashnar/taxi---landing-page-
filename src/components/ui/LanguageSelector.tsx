import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './dropdown-menu';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'uz', label: "O'zbekcha", short: 'UZ', flag: '🇺🇿', desc: "O'zbek tili" },
    { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺', desc: 'Русский язык' },
    { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸', desc: 'English (US)' },
  ];

  const currentLang = languages.find((l) => l.code === (i18n.language || 'uz')) || languages[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="shadcn-btn shadcn-btn-ghost lang-trigger-btn group"
          aria-label="Tilni tanlash"
        >
          <Globe size={16} className="lang-globe-icon" />
          <span className="lang-short-code">{currentLang.short}</span>
          <ChevronDown
            size={14}
            className="lang-chevron transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="lang-dropdown-menu">
        <DropdownMenuLabel className="lang-dropdown-header">
          <Languages size={13} className="text-yellow-400" />
          <span>
            {currentLang.code === 'uz'
              ? 'Tilni tanlang'
              : currentLang.code === 'ru'
              ? 'Выберите язык'
              : 'Select language'}
          </span>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="lang-dropdown-sep" />

        <div className="lang-dropdown-list">
          {languages.map((lang) => {
            const isSelected = lang.code === currentLang.code;
            return (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`lang-dropdown-item ${isSelected ? 'active' : ''}`}
              >
                <div className="lang-item-left">
                  <span className="lang-flag-emoji">{lang.flag}</span>
                  <div className="lang-item-info">
                    <span className="lang-item-title">{lang.label}</span>
                    <span className="lang-item-desc">{lang.desc}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="lang-check-badge">
                    <Check size={13} />
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
