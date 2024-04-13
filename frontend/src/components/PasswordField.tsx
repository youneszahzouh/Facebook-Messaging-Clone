"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputProps,
} from "../shadcn";
import { cn } from "../utils";

import { Eye, EyeOff, LucideIcon } from "lucide-react";
import { useState } from "react";
import { Control, FieldPath, FieldValues } from "react-hook-form";

export const PasswordField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  InputProps,
  label,
  className,
  showErrors = true,
  Icon,
  placeholder,
  ...props
}: {
  control: Control<TFieldValues>;
  showErrors?: boolean;
  name: TName;
  label?: string;
  placeholder?: string;
  className?: string;
  Icon?: LucideIcon;
  InputProps?: Omit<InputProps, "name" | "type" | "placeholder">;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const type = showPassword ? "text" : "password";
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { className: inputClassName, ...restInputProps } = InputProps || {};
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {!!label && <FormLabel>{label}</FormLabel>}
          <div className="relative flex w-full items-center">
            <FormControl>
              <Input
                {...restInputProps}
                {...field}
                placeholder={placeholder}
                type={type}
                className={cn(
                  {
                    "focus-visible:ring-destructive": fieldState.error,
                  },
                  inputClassName
                )}
              />
            </FormControl>

            {Icon ? (
              <Icon className="absolute end-4 flex h-5 w-5 items-center text-gray-500" />
            ) : (
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute end-4 flex h-5 w-5 items-center text-gray-500"
              >
                {showPassword ? (
                  <Eye className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-gray-500" />
                )}
              </button>
            )}
          </div>
          {showErrors && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
