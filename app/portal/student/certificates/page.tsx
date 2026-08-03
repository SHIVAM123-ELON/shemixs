'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { EmptyState } from '@/components/portal/shared/empty-state';
import { Button } from '@/components/ui/button';
import { certificates } from '@/lib/portal/data';

export default function CertificatesPage() {
  return (
    <>
      <PageHeader title="Certificates" description="View and download your earned certificates." />

      {certificates.length === 0 ? (
        <EmptyState icon="BadgeCheck" title="No certificates yet" description="Complete courses to earn certificates." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20">
              {/* Certificate Header */}
              <div className="relative h-40 overflow-hidden gradient-brand-soft">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icons.BadgeCheck className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="absolute right-3 top-3">
                  <span className="rounded-md bg-success/90 px-2 py-0.5 text-xs font-medium text-success-foreground">
                    Grade {cert.grade}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-foreground">{cert.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Issued {new Date(cert.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <div className="mt-3 rounded-lg bg-muted p-2">
                  <p className="text-xs text-muted-foreground">Credential ID</p>
                  <p className="font-mono text-xs font-medium text-foreground">{cert.credentialId}</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Icons.Eye className="mr-2 h-3.5 w-3.5" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Icons.Download className="mr-2 h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
