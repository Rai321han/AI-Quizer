"use client";

import React from "react";
// import { Button } from "@/components/ui/button";
// import { authClient } from "@/lib/auth-client";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { signinSchema, SigninType } from "../validation";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { FieldError } from "@/components/ui/field";
import { SignInForm } from "@/components/local/auth/Form";

// export default function SignIn() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//     setError,
//   } = useForm<SigninType>({
//     resolver: zodResolver(signinSchema),
//     mode: "onTouched",
//   });
//   const router = useRouter();

//   const onSubmit: SubmitHandler<SigninType> = async (data) => {
//     try {
//       const res = await authClient.signIn.email(
//         {
//           ...data,
//           callbackURL: "/",
//         },
//         {
//           onRequest: (ctx) => {},
//           onSuccess: (ctx) => {
//             router.push("/quiz/generate");
//           },
//           onError: (ctx) => {
//             if (ctx.error.code === "INVALID_EMAIL_OR_PASSWORD") {
//               setError("root", {
//                 message: "Invalid credentials.",
//               });
//             }
//           },
//         }
//       );
//     } catch (error: any) {
//       console.error("Signin error:", error);
//     }
//   };

//   return (
//     <div className="w-full h-screen flex items-center justify-center">
//       <Card className="w-full sm:max-w-md">
//         <CardHeader>
//           <CardTitle>Sign In</CardTitle>
//           <CardDescription>Sign in to your account.</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form
//             className="flex flex-col gap-2"
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <Input
//               type="email"
//               {...register("email")}
//               placeholder="ex: raihan@gmail.com"
//             />
//             {errors.email && (
//               <p className="text-red-700 text-sm">{errors.email.message}</p>
//             )}
//             <Input
//               type="password"
//               {...register("password")}
//               placeholder="********"
//             />
//             {errors.password && (
//               <p className="text-red-700 text-sm">{errors.password.message}</p>
//             )}
//             {errors.root && (
//               <FieldError className="text-red-700 text-sm">
//                 {errors.root.message}
//               </FieldError>
//             )}
//             <Button
//               disabled={isSubmitting}
//               className={`${isSubmitting && "opacity-50 cursor-not-allowed"}`}
//               type="submit"
//             >
//               Sign in
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

export default function page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <SignInForm />
    </div>
  );
}
