"use client";

import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";
import { authClient } from "@/lib/auth-client";
import Buttonx from "./Buttonx";
import { MenuIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Nav() {
  const { data, isPending, refetch, error } = useUser();
  const [active, setActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const navOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (navOverlayRef.current && navOverlayRef.current.contains(target)) {
        setActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
      <nav
        className={`hidden sm:flex flex-row justify-between p-3 sticky top-0 z-10 w-full bg-background border-b-1`}
      >
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
      </nav>

      <nav
        className={`flex sm:hidden flex-row justify-between p-3 sticky top-0 z-10 w-full bg-background border-b-1`}
      >
        <div
          className="flex flex-row items-center gap-4 cursor-pointer"
          onClick={() => redirect("/")}
        >
          <h1 className="text-sm sm:text-lg font-anton text-zinc-500">AQ</h1>
        </div>
        <Buttonx
          className="sm:hidden block"
          onClick={() => setActive((prev) => !prev)}
        >
          <MenuIcon />
        </Buttonx>
        <div
          ref={navOverlayRef}
          className={` ${
            active
              ? "block opacity-100 pointer-events-auto"
              : "hidden opacity-0 pointer-events-none"
          } w-full h-screen absolute top-0 transition-all duration-100 left-0 bg-foreground/50`}
        ></div>
        <div
          className={`${
            active ? "block" : "hidden"
          } min-h-screen sm:hidden p-3 z-10 flex flex-col gap-4 pb-10 rounded-l-md min-w-[300px] translate-x-0 top-0 absolute right-0 bg-card border-l-1`}
        >
          <Buttonx
            className="sm:hidden block self-start"
            onClick={() => setActive((prev) => !prev)}
          >
            <X />
          </Buttonx>
          <div className="flex flex-col justify-between gap-2 flex-1">
            <div>
              <div className="flex flex-col font-mono text-foreground/60 p-2 mx-auto gap-3">
                {data?.user && (
                  <Link
                    href="/dashboard"
                    className={`${
                      pathname === "/dashboard" &&
                      "border-b-2 border-primary/50"
                    } hover:text-foreground`}
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  href="/quiz/generate"
                  className={`${
                    pathname.endsWith("/generate") &&
                    "border-b-2 border-primary/50"
                  } hover:text-foreground`}
                >
                  Generate Quiz
                </Link>
              </div>
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
        </div>
      </nav>
    </>
  );
}
