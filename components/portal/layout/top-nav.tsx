'use client';

import { Menu, Search, Bell } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/site/theme-toggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { studentProfile } from '@/lib/portal/data';
import { notifications } from '@/lib/portal/data';

export function TopNav({ onMenuClick }: { onMenuClick: () => void }) {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <button
        type="button"
        aria-label="Open navigation menu"
        onClick={onMenuClick}
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden flex-1 sm:block sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search courses, tests, notes..."
          className="pl-9"
          aria-label="Search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Link
          href="/portal/student/notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={`Notifications, ${unreadCount} unread`}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
        </Link>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-muted"
              aria-label="Account menu"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{studentProfile.name}</span>
                <span className="text-xs text-muted-foreground">{studentProfile.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/portal/student/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/portal/student/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/portal/student/fees">Fee Status</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
