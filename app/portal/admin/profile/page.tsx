'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { adminProfile, adminActivities } from '@/lib/portal/admin-data';

function formatTimestamp(ts: string) {
  const date = new Date(ts);
  const now = new Date('2025-08-02T12:00:00');
  const diffMs = now.getTime() - date.getTime();
  const diffH = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffH < 1) return 'Just now';
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.floor(diffH / 24)}d ago`;
}

export default function AdminProfilePage() {
  return (
    <>
      <PageHeader title="Profile" description="Manage your admin profile and preferences." />

      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <SectionCard title="Profile Photo" icon={<Icons.User className="h-4 w-4 text-primary" />}>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={adminProfile.avatar} alt={adminProfile.name} />
                    <AvatarFallback>RK</AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="mt-4"><Icons.Camera className="mr-2 h-3.5 w-3.5" /> Change Photo</Button>
                  <p className="mt-2 text-xs text-muted-foreground">JPG, PNG. Max 2MB.</p>
                </div>
              </SectionCard>
            </div>

            <div className="lg:col-span-2">
              <SectionCard title="Personal Details" icon={<Icons.UserCog className="h-4 w-4 text-secondary" />}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div><Label htmlFor="p-name">Full Name</Label><Input id="p-name" defaultValue={adminProfile.name} className="mt-1.5" /></div>
                  <div><Label htmlFor="p-email">Email</Label><Input id="p-email" type="email" defaultValue={adminProfile.email} className="mt-1.5" /></div>
                  <div><Label htmlFor="p-phone">Phone</Label><Input id="p-phone" defaultValue={adminProfile.phone} className="mt-1.5" /></div>
                  <div><Label htmlFor="p-role">Role</Label><Input id="p-role" defaultValue={adminProfile.role} disabled className="mt-1.5" /></div>
                </div>
                <div className="mt-4 flex justify-end"><Button size="sm">Save Changes</Button></div>
              </SectionCard>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <SectionCard title="Security" icon={<Icons.Lock className="h-4 w-4 text-destructive" />}>
            <div className="space-y-4">
              <div className="grid gap-4 sm:max-w-md">
                <div><Label htmlFor="cur-pw">Current Password</Label><Input id="cur-pw" type="password" className="mt-1.5" /></div>
                <div><Label htmlFor="new-pw">New Password</Label><Input id="new-pw" type="password" className="mt-1.5" /></div>
                <div><Label htmlFor="conf-pw">Confirm New Password</Label><Input id="conf-pw" type="password" className="mt-1.5" /></div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3 sm:max-w-md">
                <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security</p></div>
                <Switch defaultChecked aria-label="2FA" />
              </div>
              <div><Button size="sm">Update Password</Button></div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="preferences">
          <SectionCard title="Preferences" icon={<Icons.Settings className="h-4 w-4 text-primary" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Email notifications</p><p className="text-xs text-muted-foreground">Receive email for system alerts</p></div>
                <Switch defaultChecked aria-label="Email notifications" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Compact mode</p><p className="text-xs text-muted-foreground">Reduce spacing for denser layout</p></div>
                <Switch aria-label="Compact mode" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Default landing page</p><p className="text-xs text-muted-foreground">Page shown after login</p></div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground"><option>Dashboard</option><option>Analytics</option><option>Reports</option></select>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="activity">
          <SectionCard title="Recent Activity" icon={<Icons.Activity className="h-4 w-4 text-accent" />}>
            <div className="space-y-3">
              {adminActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarImage src={activity.avatar} alt={activity.user} />
                    <AvatarFallback>{activity.user.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-foreground">
                      <span className="font-medium">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action.toLowerCase()}</span>{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground/70">{formatTimestamp(activity.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
