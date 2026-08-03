'use client';

import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { Button } from '@/components/ui/button';
import { timetableEntries } from '@/lib/portal/admin-data';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['08:00 - 09:00', '09:15 - 10:15', '11:30 - 12:30', '14:00 - 15:30'];

export default function AdminTimetablePage() {
  return (
    <>
      <PageHeader title="Timetable" description="Weekly timetable for all classes and teachers.">
        <Button size="sm" variant="outline"><Icons.Printer className="mr-2 h-4 w-4" /> Print</Button>
        <Button size="sm"><Icons.PlusCircle className="mr-2 h-4 w-4" /> Add Slot</Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionCard title="Weekly Timetable" icon={<Icons.CalendarDays className="h-4 w-4 text-primary" />}>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-2 text-left font-semibold text-muted-foreground">Time</th>
                    {days.map((day) => <th key={day} className="p-2 text-center font-semibold text-muted-foreground">{day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot) => (
                    <tr key={slot} className="border-b border-border last:border-0">
                      <td className="p-2 font-medium text-muted-foreground">{slot}</td>
                      {days.map((day) => {
                        const entry = timetableEntries.find((e) => e.day === day && e.time === slot);
                        return (
                          <td key={day} className="p-2">
                            {entry ? (
                              <div className="rounded-lg border border-primary/20 bg-primary/5 p-2">
                                <p className="font-semibold text-foreground">{entry.subject}</p>
                                <p className="text-muted-foreground">{entry.class}</p>
                                <p className="text-muted-foreground">{entry.room}</p>
                              </div>
                            ) : (
                              <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-border p-2 text-muted-foreground/50">—</div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>

        <SectionCard title="Quick Filters" icon={<Icons.Filter className="h-4 w-4 text-secondary" />}>
          <div className="space-y-3">
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground">View By</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Class</Button>
                <Button size="sm" variant="outline">Teacher</Button>
                <Button size="sm" variant="outline">Room</Button>
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Select Class</p>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option>All Classes</option>
                <option>Class 11-A</option>
                <option>Class 12-B</option>
                <option>Class 11-C</option>
              </select>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold text-muted-foreground">Select Teacher</p>
              <select className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                <option>All Teachers</option>
                <option>Dr. Priya Menon</option>
                <option>Dr. Anjali Verma</option>
                <option>Prof. Vikram Rao</option>
              </select>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
