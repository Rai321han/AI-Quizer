"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { FieldError } from "@/components/ui/field";

export const SignUpForm = () => {
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
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {},
          onSuccess: (ctx) => {},
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

  return (
    // <div className="w-full h-screen flex items-center justify-center">
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input type="text" {...register("name")} placeholder="ex: Raihan Uddin" />
      {errors.name && (
        <p className="text-red-700 text-sm">{errors.name.message}</p>
      )}
      <Input
        type="email"
        {...register("email")}
        placeholder="ex: raihan@gmail.com"
      />
      {errors.email && (
        <p className="text-red-700 text-sm">{errors.email.message}</p>
      )}
      <Input type="password" {...register("password")} placeholder="********" />
      {errors.password && (
        <p className="text-red-700 text-sm">{errors.password.message}</p>
      )}
      {errors.root && (
        <p className="text-red-700 text-sm">{errors.root.message}</p>
      )}
      <Button
        disabled={isSubmitting}
        className={`${
          isSubmitting && "opacity-50 cursor-not-allowed"
        } text-foreground`}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
    // </div>
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
          callbackURL: "/",
        },
        {
          onRequest: (ctx) => {},
          onSuccess: (ctx) => {
            router.push("/quiz/generate");
          },
          onError: (ctx) => {
            if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
              setError("root", {
                message: "Invalid credentials.",
              });
            }
          },
        },
      );
    } catch (error: any) {
      console.error("Signin error:", error);
    }
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="email"
        {...register("email")}
        placeholder="ex: raihan@gmail.com"
      />
      {errors.email && (
        <p className="text-red-700 text-sm">{errors.email.message}</p>
      )}
      <Input type="password" {...register("password")} placeholder="********" />
      {errors.password && (
        <p className="text-red-700 text-sm">{errors.password.message}</p>
      )}
      {errors.root && (
        <FieldError className="text-red-700 text-sm">
          {errors.root.message}
        </FieldError>
      )}
      <Button
        disabled={isSubmitting}
        className={`${
          isSubmitting && "opacity-50 cursor-not-allowed"
        } text-foreground`}
        type="submit"
      >
        Sign in
      </Button>
    </form>
  );
};
