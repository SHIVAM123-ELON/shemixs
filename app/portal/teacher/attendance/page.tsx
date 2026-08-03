'use client';

import { useState } from 'react';
import * as Icons from 'lucide-react';
import { PageHeader } from '@/components/portal/shared/page-header';
import { SectionCard } from '@/components/portal/shared/section-card';
import { StatCard } from '@/components/portal/shared/stat-card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { studentRecords, teacherCourses, attendanceHistoryData } from '@/lib/portal/teacher-data';

type AttendanceStatus = 'present' | 'absent' | 'late' | 'unmarked';

export default function TeacherAttendancePage() {
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [attendance, setAttendance] = useState<Record<string, AttendanceStatus>>({});

  const markAttendance = (studentId: string, status: AttendanceStatus) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const markAllPresent = () => {
    const allPresent: Record<string, AttendanceStatus> = {};
    studentRecords.forEach((s) => { allPresent[s.id] = 'present'; });
    setAttendance(allPresent);
  };

  const presentCount = Object.values(attendance).filter((s) => s === 'present').length;
  const absentCount = Object.values(attendance).filter((s) => s === 'absent').length;
  const lateCount = Object.values(attendance).filter((s) => s === 'late').length;
  const markedCount = Object.values(attendance).filter((s) => s !== 'unmarked').length;

  const statusButton = (studentId: string, status: AttendanceStatus, icon: React.ReactNode, label: string, activeClass: string) => {
    const current = attendance[studentId] ?? 'unmarked';
    const isActive = current === status;
    return (
      <button
        type="button"
        onClick={() => markAttendance(studentId, status)}
        className={cn(
          'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
          isActive ? activeClass : 'border border-border text-muted-foreground hover:bg-muted'
        )}
        aria-label={`Mark ${label}`}
      >
        {icon}
        {label}
      </button>
    );
  };

  return (
    <>
      <PageHeader title="Attendance" description="Mark and track student attendance for your classes.">
        <Button size="sm" onClick={markAllPresent}>
          <Icons.CheckCheck className="mr-2 h-4 w-4" />
          Mark All Present
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select value={course} onValueChange={setCourse}>
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="Select course" />
          </SelectTrigger>
          <SelectContent>
            {teacherCourses.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={batch} onValueChange={setBatch}>
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Select batch" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pcm-a">PCM-A</SelectItem>
            <SelectItem value="pcm-b">PCM-B</SelectItem>
          </SelectContent>
        </Select>
        <div className="text-sm text-muted-foreground">
          {new Date('2025-08-02').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present" value={presentCount} icon="CheckCircle2" accent="success" />
        <StatCard label="Absent" value={absentCount} icon="XCircle" accent="destructive" />
        <StatCard label="Late" value={lateCount} icon="Clock" accent="warning" />
        <StatCard label="Marked" value={`${markedCount}/${studentRecords.length}`} icon="ClipboardCheck" accent="primary" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Student List */}
        <div className="lg:col-span-2">
          <SectionCard title="Student List" icon={<Icons.Users className="h-4 w-4 text-primary" />}>
            <div className="space-y-2">
              {studentRecords.map((student) => (
                <div key={student.id} className="flex flex-col gap-3 rounded-lg border border-border p-3 sm:flex-row sm:items-center">
                  <Avatar className="h-9 w-9 shrink-0">
                    <AvatarImage src={student.avatar} alt={student.name} />
                    <AvatarFallback>{student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.rollNumber}</p>
                  </div>
                  <div className="flex gap-1.5">
                    {statusButton(student.id, 'present', <Icons.Check className="h-3 w-3" />, 'Present', 'bg-success/10 text-success border border-success/20')}
                    {statusButton(student.id, 'absent', <Icons.X className="h-3 w-3" />, 'Absent', 'bg-destructive/10 text-destructive border border-destructive/20')}
                    {statusButton(student.id, 'late', <Icons.Clock className="h-3 w-3" />, 'Late', 'bg-warning/10 text-warning border border-warning/20')}
                  </div>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full">
              <Icons.Save className="mr-2 h-4 w-4" />
              Save Attendance
            </Button>
          </SectionCard>
        </div>

        {/* Attendance History */}
        <SectionCard title="Attendance History" icon={<Icons.History className="h-4 w-4 text-secondary" />}>
          <div className="space-y-3">
            {attendanceHistoryData.map((record) => {
              const total = record.present + record.absent + record.late;
              const rate = Math.round((record.present / total) * 100);
              return (
                <div key={record.date} className="rounded-lg border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">
                      {new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                    <span className={cn('text-xs font-semibold', rate >= 90 ? 'text-success' : rate >= 75 ? 'text-warning' : 'text-destructive')}>
                      {rate}%
                    </span>
                  </div>
                  <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
                    <span className="text-success">{record.present} present</span>
                    <span className="text-destructive">{record.absent} absent</span>
                    <span className="text-warning">{record.late} late</span>
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </>
  );
}
