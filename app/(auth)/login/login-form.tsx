"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "@/components/ui/toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { loginSchema, LoginValues } from "@/lib/validations/login";
import { t } from "@/lib/translations";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { redirect } from "next/navigation";
import { setLoginStatus } from "@/lib/simple-auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginValues) {
    if (data.email === "admin@example.com" && data.password === "password") {
      setLoginStatus(true);
      redirect("/dashboard");
    } else {
      toast.add({
        title: "خطا در ورود",
        description: "ایمیل یا رمز عبور اشتباه است.",
        type: "error",
      });
    }
  }

  return (
    <div className="px-4 sm:px-0 w-full flex justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>{t.login.form.title}</CardTitle>
          <CardDescription>{t.login.form.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      {t.login.email.label}
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                      placeholder={t.login.email.placeholder}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-description">
                      {t.login.password.label}
                    </FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id="form-rhf-demo-description"
                        aria-invalid={fieldState.invalid}
                        placeholder={t.login.password.placeholder}
                        autoComplete="off"
                        type={showPassword ? "text" : "password"}
                      />
                      <InputGroupAddon
                        align="inline-end"
                        className="cursor-pointer"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-4 w-4" />
                        ) : (
                          <EyeIcon className="h-4 w-4" />
                        )}
                      </InputGroupAddon>
                    </InputGroup>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit" form="form-rhf-demo">
            {t.login.submit}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
