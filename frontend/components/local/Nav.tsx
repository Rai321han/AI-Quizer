"use client";

import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { authClient } from "@/lib/auth-client";
import Buttonx from "./Buttonx";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

export default function Nav() {
  const { data, isPending, refetch, error } = useUser();
  const [active, setActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

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
    <>
      <nav className="flex flex-row justify-between p-3 sticky top-0 z-10 w-full bg-background border-b-1">
        <div
          className="flex flex-row items-center gap-4 cursor-pointer"
          onClick={() => redirect("/")}
        >
          <h1 className="text-sm sm:text-lg font-anton text-zinc-500">AQ</h1>
        </div>
        <div className="sm:flex flex-row items-center gap-2  hidden">
          <Link
            href="/quiz/generate"
            className="font-mono whitespace-nowrap text-sm hover:text-foreground text-foreground/70 underline-offset-2 border-b-3 border-border/20"
          >
            Generate Quiz
          </Link>
          {data?.user ? (
            <>
              <Link
                href="/dashboard"
                className="font-mono hover:text-foreground text-sm text-foreground/70 underline-offset-2 border-b-3 border-border/20 mx-5"
              >
                Dashboard
              </Link>
              <Buttonx onClick={signout} className="text-foreground">
                Logout
              </Buttonx>
            </>
          ) : (
            <Buttonx onClick={() => redirect("/auth")}>Login</Buttonx>
          )}
        </div>
        <Buttonx
          className="sm:hidden block"
          onClick={() => setActive((prev) => !prev)}
        >
          <MenuIcon />
        </Buttonx>
      </nav>

      <div
        className={`${
          active ? "block" : "hidden"
        } min-h-screen sm:hidden p-3 flex flex-col justify-between transition-transform duration-300 min-w-[250px] translate-x-0 absolute right-0 bg-card border-l-1`}
      >
        <div className="flex flex-col font-mono text-foreground/60 p-2 mx-auto gap-3">
          {data?.user && (
            <Link
              href="/dashboard"
              className={`${
                pathname === "/dashboard" && "border-b-2 border-primary/50"
              } hover:text-foreground`}
            >
              Dashboard
            </Link>
          )}
          <Link
            href="/quiz/generate"
            className={`${
              pathname.endsWith("/generate") && "border-b-2 border-primary/50"
            } hover:text-foreground`}
          >
            Generate Quiz
          </Link>
        </div>
        <div className="w-full">
          {data?.user ? (
            <Buttonx onClick={signout} className="text-foreground w-full">
              Logout
            </Buttonx>
          ) : (
            <Buttonx onClick={() => redirect("/auth")} className="w-full">
              Login
            </Buttonx>
          )}
        </div>
      </div>
    </>
  );
}
