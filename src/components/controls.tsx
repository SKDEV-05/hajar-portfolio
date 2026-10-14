'use client';
import { ThemeProvider, useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { copy, Locale } from '@/data/content';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Sun, Moon, Monitor } from 'lucide-react';
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
const subscribe = () => () => {};
export function Controls({ locale }: { locale: Locale }) {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const c = copy[locale];
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
  return (
    <div className="controls">
      <a
        className="language"
        href={pathname.replace(/^\/(en|fr)/, locale === 'en' ? '/fr' : '/en')}
        hrefLang={locale === 'en' ? 'fr' : 'en'}
        aria-label={c.languageLabel}
      >
        {locale === 'en' ? 'FR' : 'EN'} <span>↗</span>
      </a>
      <Select value={mounted ? theme : ''} onValueChange={setTheme}>
        <SelectTrigger aria-label={c.theme} className="theme-trigger">
          <span className="theme-label">
            <SelectValue placeholder={c.theme} />
          </span>
          <span className="theme-symbol" aria-hidden="true">
            {mounted && theme === 'dark' ? (
              <Moon size={17} />
            ) : mounted && theme === 'light' ? (
              <Sun size={17} />
            ) : (
              <Monitor size={17} />
            )}
          </span>
        </SelectTrigger>
        <SelectContent className="theme-menu">
          <SelectItem value="light">
            <span className="select-option">
              <Sun size={15} />
              {c.light}
            </span>
          </SelectItem>
          <SelectItem value="dark">
            <span className="select-option">
              <Moon size={15} />
              {c.dark}
            </span>
          </SelectItem>
          <SelectItem value="system">
            <span className="select-option">
              <Monitor size={15} />
              {c.system}
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
