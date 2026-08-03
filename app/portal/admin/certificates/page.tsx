'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminCertificates } from '@/lib/portal/admin-data';

const statusVariant = { issued: 'success', pending: 'warning', revoked: 'destructive' } as const;

export default function AdminCertificatesPage() {
  return (
    <>
      <PageHeader title="Certificate Management" description="Generate, manage, and verify certificates.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> Generate Certificate</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Certificates" value={adminCertificates.length} icon="ScrollText" accent="primary" />
        <StatCard label="Issued" value={adminCertificates.filter((c) => c.status === 'issued').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Pending" value={adminCertificates.filter((c) => c.status === 'pending').length} icon="Clock" accent="warning" />
        <StatCard label="Revoked" value={adminCertificates.filter((c) => c.status === 'revoked').length} icon="Ban" accent="destructive" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminCertificates.map((cert) => (
          <div key={cert.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icons.ScrollText className="h-5 w-5 text-primary" />
              </div>
              <StatusBadge status={cert.status} variant={statusVariant[cert.status]} />
            </div>
            <h3 className="mt-3 text-sm font-bold text-foreground">{cert.certificateType}</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">{cert.studentName}</p>
            <p className="text-xs text-muted-foreground">{cert.rollNumber}</p>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>Template: {cert.template}</p>
              <p>Issued: {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Pending'}</p>
              {cert.verificationCode && <p className="font-mono text-primary">Code: {cert.verificationCode}</p>}
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1"><Icons.Eye className="mr-2 h-3.5 w-3.5" /> View</Button>
              {cert.status === 'pending' && <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90"><Icons.Check className="h-3.5 w-3.5" /></Button>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
