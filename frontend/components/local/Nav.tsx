"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

export default function Nav() {
  const { data, isPending, refetch, error } = useUser();
  const router = useRouter();

  async function signout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth");
        },
      },
    });
  }

  return (
    <nav className="flex flex-row justify-between p-3">
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-sm sm:text-lg font-bold text-zinc-500">
          AI Quizer
        </h1>
      </div>
      <div className="flex flex-row items-center gap-2">
        {data?.user && (
          <>
            <Button onClick={signout}>Logout</Button>
            <Link
              href="/dashboard"
              className="border-1 border-border px-3  py-2 text-sm rounded-md hover:bg-card"
            >
              Dashboard
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
