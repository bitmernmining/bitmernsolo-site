import React from "react";
import type { Page } from "./preview-data";

export const NAV_GROUPS = [
  {
    label: "Mining",
    items: [
      { id: "dashboard" as Page, label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { id: "miners" as Page, label: "Miners", icon: "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" },
      { id: "earnings" as Page, label: "Earnings", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
      { id: "payouts" as Page, label: "Payouts", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    ],
  },
  {
    label: "Pool",
    items: [
      { id: "pool" as Page, label: "Pool Stats", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
    ],
  },
  {
    label: "Account",
    items: [
      { id: "alerts" as Page, label: "Alerts", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
    ],
  },
];

export const URL_MAP: Record<Page, string> = {
  dashboard: "app.bitmernsolo.com/dashboard",
  miners: "app.bitmernsolo.com/miners",
  earnings: "app.bitmernsolo.com/earnings",
  payouts: "app.bitmernsolo.com/payouts",
  pool: "app.bitmernsolo.com/pool",
  alerts: "app.bitmernsolo.com/alerts",
};

/* ─── Shared tiny components ─── */

export function NavIcon({ d }: { d: string }) {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  );
}

export function MiniStatCard({
  title,
  value,
  subtitle,
  trend,
  icon,
  iconBg,
  live,
}: {
  title: string;
  value: string;
  subtitle?: string;
  trend?: number;
  icon?: React.ReactNode;
  iconBg?: string;
  live?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border/40 bg-card p-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-1">
          <p className="text-[11px] font-medium text-muted-foreground">{title}</p>
          {live && (
            <span className="flex items-center gap-0.5">
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-primary" />
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider text-primary">live</span>
            </span>
          )}
        </div>
        {icon && (
          <div className={`rounded-md p-1 ${iconBg ?? "bg-muted/60"}`}>
            {icon}
          </div>
        )}
      </div>
      <p className="mt-1 font-mono text-lg font-bold tabular-nums tracking-tight">{value}</p>
      <div className="mt-0.5 flex items-center gap-1">
        {trend !== undefined && (
          <span className={`flex items-center gap-0.5 text-[10px] font-medium ${trend >= 0 ? "text-primary" : "text-red-500"}`}>
            <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={trend >= 0 ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" : "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"} />
            </svg>
            {Math.abs(trend).toFixed(1)}%
          </span>
        )}
        {subtitle && <span className="text-[10px] text-muted-foreground">{subtitle}</span>}
      </div>
    </div>
  );
}

export function StatusDot({ color }: { color: string }) {
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${color}`} />;
}

export function PillBadge({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${className}`}>
      {children}
    </span>
  );
}

export function SectionCard({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border/40 bg-card">
      <div className="flex items-center justify-between border-b border-border/30 px-3 py-2">
        <p className="text-xs font-semibold">{title}</p>
        {icon}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

/* Mini icons for stat cards */
export const ActivityIcon = <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
export const HardDriveIcon = <svg className="h-3 w-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M22 12H2M22 12a10 10 0 01-10 10M22 12a10 10 0 00-10-10M2 12a10 10 0 0010 10M2 12A10 10 0 0112 2m0 0v20" /></svg>;
export const WalletIcon = <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
export const PickaxeIcon = <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" /></svg>;
export const DollarIcon = <svg className="h-3 w-3 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
export const CoinsIcon = <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1110.34 18" /><path d="M7 6h1v4" /><circle cx="16" cy="16" r="6" /></svg>;
