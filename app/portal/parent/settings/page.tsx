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
import { parentProfile } from '@/lib/portal/parent-data';

export default function ParentSettingsPage() {
  const [notifications, setNotifications] = useState({
    attendance: true,
    exams: true,
    homework: true,
    fees: true,
    general: true,
  });

  return (
    <>
      <PageHeader title="Settings" description="Manage your account preferences and configurations." />

      <Tabs defaultValue="account">
        <TabsList className="mb-6">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="language">Language</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <SectionCard title="Parent Information" icon={<Icons.User className="h-4 w-4 text-primary" />}>
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={parentProfile.avatar} alt={parentProfile.name} />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div>
                <Button size="sm" variant="outline">Change Photo</Button>
                <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={parentProfile.name} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={parentProfile.email} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={parentProfile.phone} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="relation">Relation</Label>
                <Input id="relation" defaultValue={parentProfile.relation} disabled className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="occupation">Occupation</Label>
                <Input id="occupation" defaultValue={parentProfile.occupation} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={parentProfile.address} className="mt-1.5" />
              </div>
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
                { key: 'attendance', label: 'Attendance Alerts', desc: 'Notifications about your child\'s attendance and absences' },
                { key: 'exams', label: 'Exam Alerts', desc: 'Test schedules, results, and performance updates' },
                { key: 'homework', label: 'Homework Reminders', desc: 'Alerts about pending and overdue homework' },
                { key: 'fees', label: 'Fee Notifications', desc: 'Fee invoices, payment confirmations, and due dates' },
                { key: 'general', label: 'General Announcements', desc: 'School-wide announcements and parent-teacher meeting notices' },
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

        {/* Language Tab */}
        <TabsContent value="language">
          <SectionCard title="Language" icon={<Icons.Globe className="h-4 w-4 text-accent" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Display Language</p>
                  <p className="text-xs text-muted-foreground">Choose your preferred language</p>
                </div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground">
                  <option>English</option>
                  <option>हिन्दी (Hindi)</option>
                  <option>ಕನ್ನಡ (Kannada)</option>
                  <option>தமிழ் (Tamil)</option>
                  <option>తెలుగు (Telugu)</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Date Format</p>
                  <p className="text-xs text-muted-foreground">How dates are displayed</p>
                </div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>DD MMM YYYY</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Timezone</p>
                  <p className="text-xs text-muted-foreground">Used for all schedule displays</p>
                </div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground">
                  <option>IST (UTC+5:30)</option>
                  <option>GMT (UTC+0)</option>
                  <option>EST (UTC-5)</option>
                </select>
              </div>
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

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <SectionCard title="Privacy Settings" icon={<Icons.Shield className="h-4 w-4 text-success" />}>
            <div className="space-y-4">
              {[
                { label: 'Show child\'s name on leaderboards', desc: 'Display your child\'s name on class rankings' },
                { label: 'Share attendance with other parents', desc: 'Allow other parents to see your child\'s attendance' },
                { label: 'Allow teachers to share progress', desc: 'Let teachers share progress reports with other parents' },
                { label: 'Show contact info to teachers', desc: 'Display your contact information to teaching staff' },
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

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <SectionCard title="Security" icon={<Icons.Lock className="h-4 w-4 text-destructive" />}>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch aria-label="Two-factor authentication" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Login alerts</p>
                  <p className="text-xs text-muted-foreground">Get notified of new sign-ins</p>
                </div>
                <Switch defaultChecked aria-label="Login alerts" />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium text-foreground">Session timeout</p>
                  <p className="text-xs text-muted-foreground">Automatically log out after inactivity</p>
                </div>
                <select className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm text-foreground">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>Never</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Change Password" icon={<Icons.KeyRound className="h-4 w-4 text-secondary" />}>
            <div className="grid gap-4 sm:max-w-md">
              <div>
                <Label htmlFor="sec-current">Current Password</Label>
                <Input id="sec-current" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="sec-new">New Password</Label>
                <Input id="sec-new" type="password" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="sec-confirm">Confirm New Password</Label>
                <Input id="sec-confirm" type="password" className="mt-1.5" />
              </div>
            </div>
            <div className="mt-4">
              <Button size="sm">Change Password</Button>
            </div>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </>
  );
}
