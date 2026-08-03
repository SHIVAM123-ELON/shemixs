'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

interface BaseChartProps {
  data: Record<string, unknown>[];
  height?: number;
}

export function MonthlyProgressChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    score: { label: 'Avg Score', color: 'hsl(var(--chart-1))' },
    attendance: { label: 'Attendance %', color: 'hsl(var(--chart-4))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <AreaChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="score" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#fillScore)" />
        <Area type="monotone" dataKey="attendance" stroke="hsl(var(--chart-4))" strokeWidth={2} fill="none" strokeDasharray="4 4" />
      </AreaChart>
    </ChartContainer>
  );
}

export function ResultAnalysisChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    scored: { label: 'Scored', color: 'hsl(var(--chart-1))' },
    total: { label: 'Total', color: 'hsl(var(--muted-foreground))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <BarChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="subject" tickLine={false} axisLine={false} fontSize={11} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="scored" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="total" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
}

export function FeeHistoryChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    paid: { label: 'Paid', color: 'hsl(var(--chart-2))' },
    pending: { label: 'Pending', color: 'hsl(var(--chart-3))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <BarChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="paid" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} barSize={24} />
        <Bar dataKey="pending" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} barSize={24} />
      </BarChart>
    </ChartContainer>
  );
}

export function WeeklyProgressChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    studyHours: { label: 'Study Hours', color: 'hsl(var(--chart-1))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <LineChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="studyHours" stroke="hsl(var(--chart-1))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--chart-1))' }} activeDot={{ r: 6 }} />
      </LineChart>
    </ChartContainer>
  );
}
