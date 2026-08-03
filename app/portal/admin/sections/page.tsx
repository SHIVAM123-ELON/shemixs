'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminSections } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', inactive: 'muted' } as const;

export default function AdminSectionsPage() {
  return (
    <>
      <PageHeader title="Section Management" description="Manage sections within classes.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Section</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sections" value={adminSections.length} icon="Columns3" accent="primary" />
        <StatCard label="Active" value={adminSections.filter((s) => s.status === 'active').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Total Students" value={adminSections.reduce((sum, s) => sum + s.students, 0)} icon="Users" accent="secondary" />
        <StatCard label="Avg Section Size" value={Math.round(adminSections.reduce((sum, s) => sum + s.students, 0) / adminSections.length)} icon="Users" accent="warning" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => (
          <div key={section.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10"><Icons.Columns3 className="h-5 w-5 text-primary" /></div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{section.name}</h3>
                  <p className="text-xs text-muted-foreground">{section.class}</p>
                </div>
              </div>
              <StatusBadge status={section.status} variant={statusVariant[section.status]} />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-muted-foreground"><Icons.Users className="h-3 w-3" /> {section.students}/{section.capacity} students</div>
              <div className="flex items-center gap-1 text-muted-foreground"><Icons.User className="h-3 w-3" /> {section.teacher}</div>
            </div>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Fill Rate</span>
                <span className="font-semibold text-foreground">{Math.round((section.students / section.capacity) * 100)}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${(section.students / section.capacity) * 100}%` }} />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Manage</Button>
              <Button size="sm" variant="ghost"><Icons.Pencil className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
