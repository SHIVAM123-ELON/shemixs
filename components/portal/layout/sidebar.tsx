'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from 'lucide-react';
import { Logo } from '@/components/site/logo';
import { portalNavGroups } from '@/lib/portal/nav';
import { getIcon } from '@/lib/portal/icons';
import { cn } from '@/lib/utils';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex"
      aria-label="Student portal navigation"
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-6">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Sidebar sections">
        {portalNavGroups.map((group) => (
          <div key={group.title} className="mb-6">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.title}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = getIcon(item.icon);
                const isActive =
                  item.href === '/portal/student'
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-sidebar-foreground/70 hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
      <div className="border-t border-sidebar-border p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Icons.ArrowLeft className="h-4 w-4" />
          Back to website
        </Link>
      </div>
    </aside>
  );
}
