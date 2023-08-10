"use client";
import { FC, useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AuthSchema, authSchema } from "@/lib/validations/auth-schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import googleIcon from "@/assets/googleIcon.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageLoader from "./ui/page-loader";
import { MoonLoader, PulseLoader } from "react-spinners";

interface AuthFormProps {
  variant: "SIGN_IN" | "REGISTER";
  callbackURL: string;
}

const AuthForm: FC<AuthFormProps> = ({ variant, callbackURL }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Auth with credentials
  const onSubmit = async (form: AuthSchema) => {
    if (variant === "REGISTER") {
      setIsLoading(true);
      try {
        await axios.post("/api/users", form);
        const result = await signIn("credentials", {
          ...form,
          redirect: false,
        });
        if (result?.error) {
          // TODO: handle errors
          toast.error("Email already exists!");
        } else {
          router.replace(callbackURL);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    } else if (variant === "SIGN_IN") {
      try {
        setIsLoading(true);
        const result = await signIn("credentials", {
          ...form,
          redirect: false,
        });
        if (result?.error) {
          // TODO: handle errors
          toast.error("Invalid Credentials");
        } else {
          router.replace(callbackURL);
        }
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleGoogleAuth = () => {
    setIsRedirecting(true);
    signIn("google");
  };

  return (
    <div className="">
      {isRedirecting && (
        <PageLoader message="Please wait while being redirected" />
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          <h1 className="text-2xl font-bold text-center">
            {variant === "REGISTER" ? "Sign Up" : "Login"}
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email:</FormLabel>
                <FormControl>
                  <Input placeholder="your-email@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password:</FormLabel>
                <FormControl>
                  <>
                    <Input type="password" placeholder="*******" {...field} />
                    {variant === "SIGN_IN" && (
                      <Link
                        href={"#"}
                        className="text-sm font-light text-neutral-600 hover:text-neutral-900 flex justify-end"
                      >
                        Forget password?
                      </Link>
                    )}
                  </>
                </FormControl>
                {variant === "REGISTER" && (
                  <FormDescription className="text-xs">
                    Password must be at least of 6 characters, a capital letter,
                    <br />a number and a special character.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <Button
            size={"lg"}
            className="w-full rounded-xl font-bold text-lg py-6"
            type="submit"
            disabled={isLoading || !form.formState.isValid}
          >
            {isLoading ? (
              <PulseLoader color="#fff" size={10} />
            ) : variant === "REGISTER" ? (
              "Sign Up"
            ) : (
              "Login"
            )}
          </Button>
          <Link
            href={
              variant === "REGISTER"
                ? `/signin?callbackURL=${callbackURL}`
                : "/signup"
            }
            className="text-sm ml-3 text-neutral-600 hover:text-neutral-900"
          >
            {variant === "REGISTER"
              ? "Already have account? Login"
              : "Don't have account? Sign up"}
          </Link>
        </form>
        <div className="mt-6 flex flex-col items-center space-y-6 w-full">
          <h2 className="text-xl text-neutral-600">Or continue with</h2>
          <Button
            variant={"outline"}
            type="button"
            size={"lg"}
            onClick={handleGoogleAuth}
            disabled={isLoading || isRedirecting}
            className="w-full text-lg py-6 text-bold shadow shadow-lightgreen hover:border-lightgreen hover:bg-primary hover:text-primary-foreground rounded-xl flex justify-center items-center gap-3"
          >
            <Image src={googleIcon} alt="google" className="w-8 h-8" />
            Google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;
