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
      <div className="flex flex-row items-center gap-4">
        <h1 className="text-sm sm:text-lg font-anton text-zinc-500">
          AI Quizer
        </h1>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Link
          href="/quiz/generate"
          className="font-mono whitespace-nowrap text-sm hover:text-foreground text-foreground/70 underline-offset-2 border-b-3 border-border/20"
        >
          Generate Quiz
        </Link>
        {data?.user && (
          <>
            <Link
              href="/dashboard"
              className="font-mono hover:text-foreground text-sm text-foreground/70 underline-offset-2 border-b-3 border-border/20 mx-5"
            >
              Dashboard
            </Link>
            <Button onClick={signout}>Logout</Button>
          </>
        )}
      </div>
    </nav>
  );
}
