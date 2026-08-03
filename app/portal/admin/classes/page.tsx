'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { adminClasses } from '@/lib/portal/admin-data';

const statusVariant = { active: 'success', inactive: 'muted' } as const;

export default function AdminClassesPage() {
  return (
    <>
      <PageHeader title="Class Management" description="Manage classes and their assigned teachers.">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Class</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Classes" value={adminClasses.length} icon="School" accent="primary" />
        <StatCard label="Active" value={adminClasses.filter((c) => c.status === 'active').length} icon="CheckCircle2" accent="success" />
        <StatCard label="Total Students" value={adminClasses.reduce((sum, c) => sum + c.students, 0)} icon="Users" accent="secondary" />
        <StatCard label="Total Capacity" value={adminClasses.reduce((sum, c) => sum + c.capacity, 0)} icon="Maximize" accent="warning" />
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/30">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Class</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground sm:table-cell">Grade</th>
              <th className="hidden px-4 py-3 text-left font-semibold text-muted-foreground lg:table-cell">Class Teacher</th>
              <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground md:table-cell">Students</th>
              <th className="hidden px-4 py-3 text-center font-semibold text-muted-foreground lg:table-cell">Room</th>
              <th className="px-4 py-3 text-center font-semibold text-muted-foreground">Status</th>
              <th className="px-4 py-3 text-right font-semibold text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {adminClasses.map((cls) => (
              <tr key={cls.id} className="transition-colors hover:bg-muted/20">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10"><Icons.School className="h-4 w-4 text-primary" /></div>
                    <span className="font-medium text-foreground">{cls.name}</span>
                  </div>
                </td>
                <td className="hidden px-4 py-3 sm:table-cell text-muted-foreground">{cls.grade} · Sec {cls.section}</td>
                <td className="hidden px-4 py-3 lg:table-cell text-muted-foreground">{cls.classTeacher}</td>
                <td className="hidden px-4 py-3 text-center md:table-cell"><span className="font-medium text-foreground">{cls.students}</span><span className="text-muted-foreground">/{cls.capacity}</span></td>
                <td className="hidden px-4 py-3 text-center lg:table-cell text-muted-foreground">{cls.room}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={cls.status} variant={statusVariant[cls.status]} /></td>
                <td className="px-4 py-3 text-right">
                  <Button size="sm" variant="ghost"><Icons.Pencil className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.Trash2 className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
