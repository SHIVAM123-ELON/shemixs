'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { studentProfile } from '@/lib/portal/data';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    classes: true,
    homework: true,
    exams: true,
    payments: false,
    general: true,
  });

  return (
    <>
      <PageHeader title="Settings" description="Manage your account preferences and configurations." />

      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <SectionCard title="Profile Information" icon={<Icons.User className="h-4 w-4 text-primary" />}>
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={studentProfile.avatar} alt={studentProfile.name} />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <Button size="sm" variant="outline">Change Photo</Button>
                <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={studentProfile.name} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={studentProfile.email} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={studentProfile.phone} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="roll">Roll Number</Label>
                <Input id="roll" defaultValue={studentProfile.rollNumber} disabled className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                defaultValue={studentProfile.bio}
                className="mt-1.5 h-24 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button size="sm">Save Changes</Button>
            </div>
          </SectionCard>

          <SectionCard title="Password" icon={<Icons.Lock className="h-4 w-4 text-secondary" />}>
            <div className="grid gap-4 sm:max-w-md">
              <div>
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <Button size="sm">Update Password</Button>
            </div>
          </SectionCard>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <SectionCard title="Notification Preferences" icon={<Icons.Bell className="h-4 w-4 text-primary" />}>
            <div className="space-y-4">
              {([
                { key: 'classes', label: 'Class Updates', desc: 'Notifications about class schedules and new lectures' },
                { key: 'homework', label: 'Homework Reminders', desc: 'Reminders for upcoming and overdue homework' },
                { key: 'exams', label: 'Exam Alerts', desc: 'Notifications about scheduled tests and results' },
                { key: 'payments', label: 'Payment Notifications', desc: 'Fee invoices, payment confirmations, and due dates' },
                { key: 'general', label: 'General Announcements', desc: 'School-wide announcements and updates' },
              ] as const).map((item) => (
                <div key={item.key} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                    }
                    aria-label={`Toggle ${item.label}`}
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <SectionCard title="Privacy Settings" icon={<Icons.Shield className="h-4 w-4 text-success" />}>
            <div className="space-y-4">
              {[
                { label: 'Show profile to classmates', desc: 'Allow other students to view your profile' },
                { label: 'Show attendance publicly', desc: 'Display your attendance percentage on leaderboards' },
                { label: 'Show test rankings', desc: 'Display your rank on class leaderboards' },
                { label: 'Allow direct messages', desc: 'Let classmates send you direct messages' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={i < 2} aria-label={item.label} />
                </div>
              ))}
            </div>
          </SectionCard>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <SectionCard title="Appearance" icon={<Icons.Palette className="h-4 w-4 text-accent" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Compact mode</p>
                  <p className="text-xs text-muted-foreground">Reduce spacing for a denser layout</p>
                </div>
                <Switch aria-label="Compact mode" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Reduce motion</p>
                  <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch aria-label="Reduce motion" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">High contrast</p>
                  <p className="text-xs text-muted-foreground">Increase contrast for better readability</p>
                </div>
                <Switch aria-label="High contrast" />
              </div>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
