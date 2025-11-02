"use client";
import Buttonx from "@/components/local/Buttonx";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function page() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[90vh] p-4">
          <Skeleton className="mx-auto max-w-[300px] w-full h-[300px] rounded bg-card"></Skeleton>
        </div>
      }
    >
      <ClientPage />
    </Suspense>
  );
}

function ClientPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [actionText, setActionText] = useState("");

  const resend = async () => {
    try {
      setActionText("");
      await authClient.sendVerificationEmail({
        email: email || "",
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      });

      setActionText("Verification email has been sent!");
    } catch (error) {
      setActionText("Failed to send the verification email. Try again");
    }
  };
  return (
    <div className="w-full min-h-[90vh] p-4">
      <div className="w-full mx-auto max-w-[500px] bg-card p-4 font-mono rounded flex flex-col gap-3">
        <p>
          A verification email has been sent to your account.
          <br />
          <span className="font-semibold ">
            Please verify your email to continue.
          </span>
        </p>
        <Buttonx onClick={resend}>Resend Verification Email</Buttonx>
        <p className="text-sm">{actionText}</p>
      </div>
    </div>
  );
}
