"use client";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
      <div>
        <h1>Affiliate Dashboard</h1>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
  );
}