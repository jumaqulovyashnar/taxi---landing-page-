import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './dropdown-menu';

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'uz', label: "O'zbekcha", short: 'UZ', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
  ];

  const currentLang = languages.find((l) => l.code === (i18n.language || 'uz')) || languages[0];

  const handleSelect = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('i18nextLng', code);
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className="shadcn-btn shadcn-btn-ghost lang-trigger-btn group"
          aria-label="Tilni tanlash"
        >
          <Globe size={15} className="lang-globe-icon" />
          <span className="lang-short-code">{currentLang.short}</span>
          <ChevronDown
            size={13}
            className="lang-chevron transition-transform duration-200 group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={3} className="lang-dropdown-menu-compact">
        {languages.map((lang) => {
          const isSelected = lang.code === currentLang.code;
          return (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`lang-item-compact ${isSelected ? 'active' : ''}`}
            >
              <span className="lang-item-flag">{lang.flag}</span>
              <span className="lang-item-name">{lang.label}</span>
              {isSelected && <Check size={14} className="lang-item-check" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
