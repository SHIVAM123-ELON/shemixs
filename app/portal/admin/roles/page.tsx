'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { adminRoles, permissionModules, permissionActions } from '@/lib/portal/admin-data';

export default function AdminRolesPage() {
  const [selectedRole, setSelectedRole] = useState(adminRoles[0]);

  return (
    <>
      <PageHeader title="Roles & Permissions" description="Enterprise role-based access control (RBAC).">
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> Create Role</Button>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Roles" value={adminRoles.length} icon="ShieldCheck" accent="primary" />
        <StatCard label="System Roles" value={adminRoles.filter((r) => r.isSystem).length} icon="Lock" accent="secondary" />
        <StatCard label="Custom Roles" value={adminRoles.filter((r) => !r.isSystem).length} icon="PlusCircle" accent="warning" />
        <StatCard label="Total Users" value={adminRoles.reduce((sum, r) => sum + r.users, 0)} icon="Users" accent="success" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Role List */}
        <div className="lg:col-span-1">
          <SectionCard title="Roles" icon={<Icons.ShieldCheck className="h-4 w-4 text-primary" />}>
            <div className="space-y-2">
              {adminRoles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={cn(
                    'w-full rounded-lg border p-3 text-left transition-colors',
                    selectedRole.id === role.id ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icons.ShieldCheck className={cn('h-4 w-4', selectedRole.id === role.id ? 'text-primary' : 'text-muted-foreground')} />
                      <span className="text-sm font-medium text-foreground">{role.name}</span>
                    </div>
                    {role.isSystem && <Icons.Lock className="h-3 w-3 text-muted-foreground" />}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{role.users} users</p>
                </button>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Permission Matrix */}
        <div className="lg:col-span-2">
          <SectionCard
            title={`${selectedRole.name} — Permissions`}
            icon={<Icons.Grid3x3 className="h-4 w-4 text-secondary" />}
            action={
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline"><Icons.Pencil className="mr-2 h-3.5 w-3.5" /> Edit Role</Button>
                {!selectedRole.isSystem && <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.Trash2 className="h-3.5 w-3.5" /></Button>}
              </div>
            }
          >
            <p className="mb-4 text-sm text-muted-foreground">{selectedRole.description}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-2 text-left font-semibold text-muted-foreground">Module</th>
                    {permissionActions.map((action) => (
                      <th key={action} className="p-2 text-center font-semibold text-muted-foreground">{action}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissionModules.slice(0, 12).map((module) => (
                    <tr key={module} className="border-b border-border last:border-0">
                      <td className="p-2 font-medium text-foreground">{module}</td>
                      {permissionActions.map((action) => {
                        const isFullAccess = selectedRole.permissions.includes('*');
                        const isGranted = isFullAccess || (selectedRole.permissions.includes(module.toLowerCase().replace(/ /g, '_')) && (action === 'View' || action === 'Create' || action === 'Edit'));
                        return (
                          <td key={action} className="p-2 text-center">
                            <div className="flex justify-center">
                              <Switch defaultChecked={isGranted} aria-label={`${action} ${module}`} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Showing 12 of {permissionModules.length} modules. Scroll to see more.</p>
          </SectionCard>

          <div className="mt-6">
            <SectionCard title="User Assignment" icon={<Icons.UserCog className="h-4 w-4 text-primary" />}>
              <div className="space-y-2">
                {[
                  { name: 'Rajesh Kumar', role: 'Super Admin', avatar: 'https://i.pravatar.cc/150?img=68' },
                  { name: 'Admin Office', role: 'Admin', avatar: 'https://i.pravatar.cc/150?img=70' },
                ].map((user) => (
                  <div key={user.name} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Icons.UserMinus className="h-4 w-4" /></Button>
                  </div>
                ))}
                <Button size="sm" variant="outline" className="w-full"><Icons.UserPlus className="mr-2 h-3.5 w-3.5" /> Assign User</Button>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </>
  );
}
