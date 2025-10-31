"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Layout({
  content,
  children,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-[90vh] bg-background p-4">
      {/* <div className="p-3 flex font-mono flex-row mx-auto justify-between w-full max-w-[500px] items-center bg-card border-border/20 border-1 rounded-[20px]">
        <Navitem href="/dashboard/overview">overview</Navitem>
        <Navitem href="/dashboard/account">account</Navitem>
        <Navitem href="/dashboard/settings">settings</Navitem>
      </div> */}
      <div className="max-w-[1200px] bg-card p-4 rounded-[20px] mx-auto mt-8">
        {children}
        {content}
      </div>
    </div>
  );
}

function Navitem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={`text-foreground/70 hover:text-foreground ${
        active && "border-b-1 border-border/50 text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
