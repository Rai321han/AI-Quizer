"use client";

import { authClient } from "@/lib/auth-client";
import { type SubmitHandler, useForm } from "react-hook-form";
import {
  type SignUpType,
  type SigninType,
  signinSchema,
  signupSchema,
} from "@/app/auth/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { redirect, useRouter } from "next/navigation";
import { FieldError } from "@/components/ui/field";
import Buttonx from "../Buttonx";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SignUpType>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<SignUpType> = async (data) => {
    try {
      const res = await authClient.signUp.email(
        {
          ...data,
          callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        },
        {
          onRequest: (ctx) => {},
          onSuccess: (ctx) => {
            router.push(`/auth/verify?email=${data.email}`);
          },
          onError: (ctx) => {
            if (ctx.error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
              setError("root", {
                message: "User already exists.",
              });
            }
          },
        },
      );
    } catch (error: any) {
      console.error("Signup error:", error);
    }
  };

  const onSocialSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        errorCallbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col text-xs sm:text-sm gap-2 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="text"
        {...register("name")}
        placeholder="ex: John Doe"
        className="placeholder:text-foreground/50"
      />
      {errors.name && (
        <p className="text-red-700 text-xs sm:text-sm">{errors.name.message}</p>
      )}
      <Input
        type="email"
        {...register("email")}
        placeholder="ex: john.doe@gmail.com"
        className="placeholder:text-foreground/50"
      />
      {errors.email && (
        <p className="text-red-700 text-xs sm:text-sm">
          {errors.email.message}
        </p>
      )}
      <Input
        type="password"
        {...register("password")}
        placeholder="********"
        className="placeholder:text-foreground/50"
      />
      {errors.password && (
        <p className="text-red-700 text-xs sm:text-sm">
          {errors.password.message}
        </p>
      )}
      {errors.root && (
        <p className="text-red-700 text-xs sm:text-sm">{errors.root.message}</p>
      )}

      <Buttonx
        disabled={isSubmitting}
        className={`${
          isSubmitting &&
          "opacity-50 cursor-not-allowed bg-primary/60 border-1 "
        } text-foreground transition-all duration-75`}
        type="submit"
      >
        Sign Up
      </Buttonx>
      <div className=" my-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="col-span-1 bg-border/10 h-[1px]"></div>
        <div className="col-span-1  p-2 bg-card text-foreground/70">or</div>
        <div className="col-span-1 bg-border/10 h-[1px]"></div>
      </div>

      <Button
        className="bg-zinc-900 hover:bg-zinc-700 flex flex-row items-center justify-center gap-2"
        onClick={onSocialSignIn}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="google"
        >
          <path
            fill="#fbbb00"
            d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
          ></path>
          <path
            fill="#518ef8"
            d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
          ></path>
          <path
            fill="#28b446"
            d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
          ></path>
          <path
            fill="#f14336"
            d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
          ></path>
        </svg>
        <p className="text-xs sm:text-sm md:text-md">Sign up with Google</p>
      </Button>
    </form>
  );
};

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<SigninType> = async (data) => {
    try {
      const res = await authClient.signIn.email(
        {
          ...data,
          callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        },
        {
          onSuccess: (ctx) => {
            router.push("/dashboard");
          },
          onError: (ctx) => {
            if (ctx.error.status === 403) {
              router.push(`/auth/verify?email=${data.email}`);
            }
            if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              setError("root", {
                message: "Invalid credentials.",
              });
            } else {
              setError("root", {
                message: "Invalid credentials",
              });
            }
          },
        },
      );
    } catch (error: any) {
      console.error("Signin error:", error);
    }
  };

  const onSocialSignIn = async () => {
    try {
      const data = await authClient.signIn.social({
        provider: "google",
        callbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
        errorCallbackURL: `${process.env.NEXT_PUBLIC_BASE_URL}/auth`,
      });
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <form
      className="flex text-xs sm:text-md flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        type="email"
        {...register("email")}
        placeholder="ex: john.doe@gmail.com"
        className="placeholder:text-foreground/50"
      />
      {errors.email && (
        <p className="text-red-700 text-xs sm:text-sm">
          {errors.email.message}
        </p>
      )}
      <Input
        type="password"
        {...register("password")}
        placeholder="********"
        className="placeholder:text-foreground/50"
      />
      {errors.password && (
        <p className="text-red-700 text-xs sm:text-sm">
          {errors.password.message}
        </p>
      )}
      {errors.root && (
        <FieldError className="text-red-700 text-xs sm:text-sm">
          {errors.root.message}
        </FieldError>
      )}
      <Buttonx
        disabled={isSubmitting}
        className={`${
          isSubmitting && "opacity-50 cursor-not-allowed bg-primary/60 border-1"
        } text-foreground transition-all duration-75`}
        type="submit"
      >
        Sign in
      </Buttonx>

      <div className=" my-4 grid grid-cols-[1fr_auto_1fr] items-center">
        <div className="col-span-1 bg-border/10 h-[1px]"></div>
        <div className="col-span-1  p-2 bg-card text-foreground/70">or</div>
        <div className="col-span-1 bg-border/10 h-[1px]"></div>
      </div>

      <Button
        className="bg-zinc-900 hover:bg-zinc-700 flex flex-row items-center justify-center gap-2"
        onClick={onSocialSignIn}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          id="google"
        >
          <path
            fill="#fbbb00"
            d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"
          ></path>
          <path
            fill="#518ef8"
            d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"
          ></path>
          <path
            fill="#28b446"
            d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"
          ></path>
          <path
            fill="#f14336"
            d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"
          ></path>
        </svg>
        <p className="text-xs sm:text-sm md:text-md">Sign in with Google</p>
      </Button>
    </form>
  );
};
