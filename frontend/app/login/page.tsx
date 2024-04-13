"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form } from "@/src/shadcn";

import { InputField, PasswordField } from "@/src/components";
import { CreditCard } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  LoginCredentialsType,
  LoginDefaultValues,
  loginCredentialsSchema,
} from "./validators";

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginCredentialsSchema),
    defaultValues: LoginDefaultValues,
  });

  const onSubmit = (values: LoginCredentialsType) => {
    console.log("login:", values);
  };

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-8 bg-transparent p-4 sm:w-4/6 md:w-1/2 lg:w-2/6">
        <div className="text-2xl font-medium text-indigo-800 ltr:text-left rtl:text-right">
          Login
        </div>
        <Form {...form}>
          <form className="flex w-full flex-col gap-4">
            <InputField
              control={form.control}
              Icon={CreditCard}
              name="email"
              InputProps={{
                className:
                  "bg-primary-50/25 focus:text-secondary-300 h-11 w-full rounded-[3px] border border-gray-300 outline-none focus:border-gray-300 focus:bg-white ltr:pr-8 rtl:pl-8",
              }}
            />

            <PasswordField
              control={form.control}
              name="password"
              InputProps={{
                className:
                  "bg-primary-50/25 focus:text-secondary-300 h-11 w-full rounded-[3px] border border-gray-300 outline-none focus:border-gray-300 focus:bg-white ltr:pr-8 rtl:pl-8",
              }}
              placeholder="Password"
            />

            <Button variant={"default"} onClick={form?.handleSubmit(onSubmit)}>
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
