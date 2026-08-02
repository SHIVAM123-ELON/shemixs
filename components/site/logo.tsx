import Link from 'next/link';
import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/site-config';

export function Logo({
  className,
  showText = true,
  size = 'default',
}: {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'default' | 'lg';
}) {
  const iconSize = size === 'sm' ? 'h-7 w-7' : size === 'lg' ? 'h-10 w-10' : 'h-8 w-8';
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';

  return (
    <Link
      href="/"
      className={cn('flex items-center gap-2 font-display font-bold tracking-tight', className)}
      aria-label={`${siteConfig.name} home`}
    >
      <span
        className={cn(
          'relative inline-flex items-center justify-center rounded-xl gradient-brand text-white shadow-glow',
          iconSize
        )}
      >
        <GraduationCap className="h-1/2 w-1/2" strokeWidth={2.5} />
      </span>
      {showText && (
        <span className={cn('text-foreground', textSize)}>
          {siteConfig.name}
        </span>
      )}
    </Link>
  );
}
