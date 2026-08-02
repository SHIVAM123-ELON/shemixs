'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
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

const tooltipStyle = {
  className: 'rounded-lg border border-border bg-popover p-3 text-popover-foreground shadow-lg',
};

export function WeeklyProgressChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    hours: { label: 'Hours Studied', color: 'hsl(var(--chart-1))' },
    target: { label: 'Target', color: 'hsl(var(--muted-foreground))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <AreaChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="fillHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.4} />
            <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area type="monotone" dataKey="target" stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" fill="none" strokeWidth={1} />
        <Area type="monotone" dataKey="hours" stroke="hsl(var(--chart-1))" strokeWidth={2} fill="url(#fillHours)" />
      </AreaChart>
    </ChartContainer>
  );
}

export function SubjectPerformanceChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    score: { label: 'Your Score', color: 'hsl(var(--chart-1))' },
    average: { label: 'Class Average', color: 'hsl(var(--chart-3))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <BarChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="subject" tickLine={false} axisLine={false} fontSize={11} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="score" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} barSize={20} />
        <Bar dataKey="average" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} barSize={20} />
      </BarChart>
    </ChartContainer>
  );
}

export function AttendanceTrendChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    percentage: { label: 'Attendance %', color: 'hsl(var(--chart-4))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <LineChart data={data} margin={{ left: 4, right: 4, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[80, 100]} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line type="monotone" dataKey="percentage" stroke="hsl(var(--chart-4))" strokeWidth={2.5} dot={{ r: 4, fill: 'hsl(var(--chart-4))' }} activeDot={{ r: 6 }} />
      </LineChart>
    </ChartContainer>
  );
}

export function TestScoresChart({ data, height = 260 }: BaseChartProps) {
  const config: ChartConfig = {
    score: { label: 'Score', color: 'hsl(var(--chart-2))' },
  };

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
        <XAxis type="number" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" domain={[0, 100]} />
        <YAxis type="category" dataKey="test" tickLine={false} axisLine={false} fontSize={11} width={70} stroke="hsl(var(--muted-foreground))" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="score" fill="hsl(var(--chart-2))" radius={[0, 4, 4, 0]} barSize={18} />
      </BarChart>
    </ChartContainer>
  );
}

const PIE_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

interface PieChartCardProps {
  data: { name: string; value: number }[];
  height?: number;
}

export function DonutChart({ data, height = 260 }: PieChartCardProps) {
  const config: ChartConfig = data.reduce((acc, item, i) => {
    acc[item.name] = { label: item.name, color: PIE_COLORS[i % PIE_COLORS.length] };
    return acc;
  }, {} as ChartConfig);

  return (
    <ChartContainer config={config} className="w-full" style={{ height }}>
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => (
            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
