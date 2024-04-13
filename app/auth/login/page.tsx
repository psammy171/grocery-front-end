"use client";

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Label from "@/components/ui/label";
import { SignInResponse, signIn } from "next-auth/react";
import validator from "validator";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Error from "@/components/ui/error";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const [emailErr, setEmailErr] = useState<string>("");
  const [passwordErr, setPasswordErr] = useState<string>("");
  const [logginIn, setLogginIn] = useState<boolean>(false);

  const loginHandler = (e: FormEvent) => {
    e.preventDefault();
    if (logginIn) return;
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    if (email.length === 0) {
      emailRef.current!.focus();
      setEmailErr("Please enter email");
      return;
    }
    if (password.length === 0) {
      passwordRef.current!.focus();
      setPasswordErr("Please enter password");
      return;
    }
    const isValidEmail = validator.isEmail(email);
    const isStrongPassword = validator.isStrongPassword(password);
    if (isValidEmail && isStrongPassword) {
      setLogginIn(true);
      signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: searchParams?.get("callbackUrl") || "/",
      })
        .then((value: SignInResponse | undefined) => {
          setLogginIn(false);
          if (value?.error)
            toast.error("Something went wrong! Please try again");
          if (value?.ok) {
            router.push(value.url!);
          }
        })
        .catch((err: any) => {
          console.log("Err : ", err);
          toast.error("Something went wrong! Please try again");
        });
    } else {
      if (!isValidEmail) {
        setEmailErr("Please enter valid email");
      }
      if (!isStrongPassword) {
        setPasswordErr("Please enter valid password");
      }
    }
  };

  return (
    <div>
      <form
        className="max-w-sm border shadow-md mx-auto mt-[10%]"
        onSubmit={loginHandler}
      >
        <p className="font-semibold text-center text-2xl py-2 border-b">
          Login
        </p>
        <div className="p-4">
          <Label inputLabel="Email" className="mb-0" />
          <Input
            type={"email"}
            ref={emailRef}
            placeholder={"Enter email"}
            onFocus={() => setEmailErr("")}
          />
          {emailErr && <Error message={emailErr} />}
          <Label inputLabel="Password" className="mb-0 mt-4" />
          <Input
            type={"password"}
            ref={passwordRef}
            placeholder={"Enter password"}
            onFocus={() => setPasswordErr("")}
          />
          {passwordErr && <Error message={passwordErr} />}
          <div className="m-1 mt-5">
            <Button className="w-full m-0" loading={logginIn}>
              Login
            </Button>
          </div>
        </div>
        <p className="text-center mb-4 text-sm">
          New to the website?{" "}
          <Link
            href="/auth/signup"
            className="font-semibold text-blue-700 hover:text-blue-800"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
