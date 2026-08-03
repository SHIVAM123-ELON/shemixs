'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function AdminSettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage institution configuration and system preferences." />

      <Tabs defaultValue="institution">
        <TabsList className="mb-6 flex flex-wrap">
          <TabsTrigger value="institution">Institution</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="institution">
          <SectionCard title="Institution Information" icon={<Icons.Building className="h-4 w-4 text-primary" />}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="inst-name">Institution Name</Label><Input id="inst-name" defaultValue="Shemixs International School" className="mt-1.5" /></div>
              <div><Label htmlFor="inst-type">Institution Type</Label><select id="inst-type" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"><option>K-12 School</option><option>College</option><option>University</option><option>Tutoring Center</option></select></div>
              <div><Label htmlFor="inst-email">Email</Label><Input id="inst-email" defaultValue="info@shemixs.edu" className="mt-1.5" /></div>
              <div><Label htmlFor="inst-phone">Phone</Label><Input id="inst-phone" defaultValue="+91 98765 00000" className="mt-1.5" /></div>
              <div className="sm:col-span-2"><Label htmlFor="inst-address">Address</Label><Input id="inst-address" defaultValue="123 Education Lane, Bangalore, Karnataka 560001" className="mt-1.5" /></div>
            </div>
            <div className="mt-4 flex justify-end"><Button size="sm">Save Changes</Button></div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="branding">
          <SectionCard title="Branding" icon={<Icons.Palette className="h-4 w-4 text-accent" />}>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border border-border bg-muted"><Icons.Image className="h-6 w-6 text-muted-foreground" /></div>
                <div><Button size="sm" variant="outline">Upload Logo</Button><p className="mt-1 text-xs text-muted-foreground">PNG or SVG. Max 1MB.</p></div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Primary Color</p><p className="text-xs text-muted-foreground">Used across the platform</p></div>
                <div className="flex items-center gap-2"><span className="h-6 w-6 rounded-full bg-primary" /><Input defaultValue="hsl(222, 47%, 51%)" className="w-40" /></div>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Custom Favicon</p><p className="text-xs text-muted-foreground">Browser tab icon</p></div>
                <Button size="sm" variant="outline">Upload</Button>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SectionCard title="Notification Settings" icon={<Icons.Bell className="h-4 w-4 text-primary" />}>
            <div className="space-y-4">
              {[
                { label: 'New admission alerts', desc: 'Notify admins when new applications are submitted' },
                { label: 'Fee payment alerts', desc: 'Notify when fees are paid or become overdue' },
                { label: 'Exam schedule alerts', desc: 'Notify teachers and students about exam schedules' },
                { label: 'System error alerts', desc: 'Notify admins of system errors and downtime' },
                { label: 'Daily summary email', desc: 'Send a daily summary of activities to admins' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div><p className="text-sm font-medium text-foreground">{item.label}</p><p className="text-xs text-muted-foreground">{item.desc}</p></div>
                  <Switch defaultChecked={i < 3} aria-label={item.label} />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="security">
          <SectionCard title="Security Settings" icon={<Icons.Shield className="h-4 w-4 text-destructive" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Require 2FA for all admin accounts</p></div>
                <Switch defaultChecked aria-label="2FA" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">IP Whitelist</p><p className="text-xs text-muted-foreground">Restrict admin access to specific IPs</p></div>
                <Switch aria-label="IP whitelist" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Session Timeout</p><p className="text-xs text-muted-foreground">Auto-logout after inactivity</p></div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground"><option>30 minutes</option><option>1 hour</option><option>4 hours</option></select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Password Policy</p><p className="text-xs text-muted-foreground">Minimum 8 chars, 1 uppercase, 1 number</p></div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="localization">
          <SectionCard title="Localization" icon={<Icons.Globe className="h-4 w-4 text-accent" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Default Language</p><p className="text-xs text-muted-foreground">Platform-wide default</p></div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground"><option>English</option><option>Hindi</option><option>Kannada</option><option>Tamil</option></select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Timezone</p><p className="text-xs text-muted-foreground">For all schedule displays</p></div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground"><option>IST (UTC+5:30)</option><option>GMT (UTC+0)</option><option>EST (UTC-5)</option></select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Currency</p><p className="text-xs text-muted-foreground">For all fee displays</p></div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground"><option>INR (₹)</option><option>USD ($)</option><option>EUR (€)</option></select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div><p className="text-sm font-medium text-foreground">Date Format</p><p className="text-xs text-muted-foreground">How dates are displayed</p></div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground"><option>DD/MM/YYYY</option><option>MM/DD/YYYY</option><option>YYYY-MM-DD</option></select>
              </div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="academic">
          <SectionCard title="Academic Session" icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><Label htmlFor="session-name">Current Session</Label><Input id="session-name" defaultValue="2025-2026" className="mt-1.5" /></div>
                <div><Label htmlFor="session-start">Start Date</Label><Input id="session-start" type="date" defaultValue="2025-06-15" className="mt-1.5" /></div>
                <div><Label htmlFor="session-end">End Date</Label><Input id="session-end" type="date" defaultValue="2026-03-31" className="mt-1.5" /></div>
                <div><Label htmlFor="grading-system">Grading System</Label><select id="grading-system" className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground"><option>Letter Grades (A-F)</option><option>Percentage</option><option>GPA (0-10)</option></select></div>
              </div>
              <div className="flex justify-end"><Button size="sm">Save Session</Button></div>
            </div>
          </SectionCard>
        </TabsContent>

        <TabsContent value="integrations">
          <SectionCard title="Integrations" icon={<Icons.Plug className="h-4 w-4 text-secondary" />}>
            <div className="space-y-3">
              {[
                { name: 'Email Service (SMTP)', desc: 'Send email notifications', connected: true, icon: Icons.Mail },
                { name: 'SMS Gateway', desc: 'Send SMS notifications', connected: true, icon: Icons.MessageSquare },
                { name: 'Payment Gateway (Stripe)', desc: 'Process online payments', connected: false, icon: Icons.CreditCard },
                { name: 'Video Conferencing', desc: 'Host live classes', connected: true, icon: Icons.Video },
                { name: 'Cloud Storage', desc: 'Store media and documents', connected: true, icon: Icons.Cloud },
                { name: 'Google Calendar', desc: 'Sync events with Google Calendar', connected: false, icon: Icons.Calendar },
              ].map((integration) => (
                <div key={integration.name} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted"><integration.icon className="h-4 w-4 text-muted-foreground" /></div>
                    <div><p className="text-sm font-medium text-foreground">{integration.name}</p><p className="text-xs text-muted-foreground">{integration.desc}</p></div>
                  </div>
                  <Button size="sm" variant={integration.connected ? 'outline' : 'default'}>{integration.connected ? 'Connected' : 'Connect'}</Button>
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
