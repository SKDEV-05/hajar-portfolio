'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { copy, Locale } from '@/data/content';

export function Navigation({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const c = copy[locale];
  return (
    <nav aria-label={c.menu}>
      {(['work', 'about', 'contact'] as const).map((route) => {
        const href = `/${locale}/${route}`;
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={route} href={href} aria-current={active ? 'page' : undefined}>
            {c[route]}
            {route === 'contact' && <span className="nav-arrow"> ↗</span>}
          </Link>
        );
      })}
    </nav>
  );
}
