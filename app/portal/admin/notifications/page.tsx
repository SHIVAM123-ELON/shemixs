'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { StatusBadge } from '@/components/portal/shared/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { adminNotifications } from '@/lib/portal/admin-data';

const statusVariant = { sent: 'success', scheduled: 'warning', draft: 'muted' } as const;
const audienceLabels: Record<string, string> = { all: 'All Users', students: 'Students', teachers: 'Teachers', parents: 'Parents', staff: 'Staff' };
const channelLabels: Record<string, string> = { push: 'Push', email: 'Email', sms: 'SMS' };

export default function AdminNotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" description="Send and manage push, email, and SMS notifications.">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> New Notification</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader><DialogTitle>Send Notification</DialogTitle></DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="notif-title">Title</Label>
                <Input id="notif-title" placeholder="Notification title" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="notif-message">Message</Label>
                <textarea id="notif-message" placeholder="Notification message..." className="mt-1.5 h-24 w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Channel</Label>
                  <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select channel" /></SelectTrigger><SelectContent><SelectItem value="push">Push</SelectItem><SelectItem value="email">Email</SelectItem><SelectItem value="sms">SMS</SelectItem></SelectContent></Select>
                </div>
                <div>
                  <Label>Audience</Label>
                  <Select><SelectTrigger className="mt-1.5"><SelectValue placeholder="Select audience" /></SelectTrigger><SelectContent><SelectItem value="all">All Users</SelectItem><SelectItem value="students">Students</SelectItem><SelectItem value="teachers">Teachers</SelectItem><SelectItem value="parents">Parents</SelectItem></SelectContent></Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline">Save Draft</Button></DialogClose>
              <Button>Send Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Sent" value={adminNotifications.filter((n) => n.status === 'sent').length} icon="Send" accent="success" />
        <StatCard label="Scheduled" value={adminNotifications.filter((n) => n.status === 'scheduled').length} icon="Clock" accent="warning" />
        <StatCard label="Total Recipients" value={adminNotifications.reduce((sum, n) => sum + n.recipients, 0)} icon="Users" accent="primary" />
        <StatCard label="Drafts" value={adminNotifications.filter((n) => n.status === 'draft').length} icon="Pencil" accent="secondary" />
      </div>

      <SectionCard title="Notification History" icon={<Icons.Bell className="h-4 w-4 text-primary" />}>
        <div className="space-y-2">
          {adminNotifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10"><Icons.Bell className="h-4 w-4 text-primary" /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-foreground">{notif.title}</p>
                  <StatusBadge status={notif.status} variant={statusVariant[notif.status]} />
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{notif.message}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="rounded-md border border-border px-1.5 py-0.5">{channelLabels[notif.channel]}</span>
                  <span>To: {audienceLabels[notif.audience]}</span>
                  <span>{notif.recipients} recipients</span>
                  {notif.sentAt && <span>· {new Date(notif.sentAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </>
  );
}
