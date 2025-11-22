"use client";

import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function UserDetails() {
  const { isPending, data, error } = authClient.useSession();

  if (isPending) {
    return (
      <div className="p-6 border rounded-md max-w-md">
        <p className="text-muted-foreground text-sm">Loading user...</p>
      </div>
    );
  }

  if (error || !data?.user) {
    return (
      <div className="p-6 border rounded-xl max-w-md mx-auto">
        <p className="text-red-500 text-sm">Failed to load user.</p>
      </div>
    );
  }

  const user = data.user;

  return (
    <section className="max-w-md  p-6 border rounded-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="h-16 w-16 rounded-full border overflow-hidden bg-muted">
          <Image
            src={user.image ?? "/placeholder-user.png"}
            alt={user.name ?? "User"}
            width={64}
            height={64}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h1 className="text-xl font-semibold">{user.name}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3">
        <InfoRow label="User ID" value={user.id} />
        <InfoRow
          label="Email Verified"
          value={user.emailVerified ? "Yes" : "No"}
        />
        <InfoRow label="Created" value={user.createdAt.toDateString()} />
        <InfoRow label="Updated" value={user.updatedAt.toDateString()} />
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
