import { SignInForm, SignUpForm } from "@/components/local/auth/Form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function page() {
  return (
    <div className="w-full h-screen p-5 flex flex-col items-center">
      <Tabs defaultValue="signup" className="p-4  w-full max-w-[500px]">
        <TabsList className="w-full">
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
          <TabsTrigger value="signin">Signin</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Create your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <SignUpForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="signin">
          <Card className="w-full ">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Sign in to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="w-full p-3 rounded-md max-w-[500px] text-xs  border-1 border-yellow-700 bg-yellow-700/5 text-yellow-950">
        <p className="italic">
          Note: This demo is deployed on a free-tier service, so the backend may
          take a 30-50 seconds to wake up after being idle. Thanks for your
          patience!
        </p>
      </div>
    </div>
  );
}
