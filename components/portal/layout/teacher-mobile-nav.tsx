'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Icons from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/site/logo';
import { teacherNavGroups } from '@/lib/portal/teacher-nav';
import { getIcon } from '@/lib/portal/icons';
import { cn } from '@/lib/utils';

interface TeacherMobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeacherMobileNav({ open, onOpenChange }: TeacherMobileNavProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b border-sidebar-border px-6 py-4">
          <SheetTitle asChild>
            <div>
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>
        <nav className="overflow-y-auto px-3 py-4" aria-label="Mobile navigation">
          {teacherNavGroups.map((group) => (
            <div key={group.title} className="mb-5">
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = getIcon(item.icon);
                  const isActive =
                    item.href === '/portal/teacher'
                      ? pathname === item.href
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <Link
            href="/"
            onClick={() => onOpenChange(false)}
            className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Icons.ArrowLeft className="h-4 w-4" />
            Back to website
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
