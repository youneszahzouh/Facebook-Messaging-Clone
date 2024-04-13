import { InputHTMLAttributes } from "react";
import { LabelProps } from "@radix-ui/react-label";

import { cn } from "../utils";

import { LucideIcon } from "lucide-react";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormField,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  InputProps,
} from "../shadcn";

export const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  InputProps,
  label,
  className,
  showErrors = true,
  Icon,
  placeholder,
  description,
  descriptionProps,
  labelProps,
  ...props
}: {
  control: Control<TFieldValues>;
  showErrors?: boolean;
  name: TName;
  placeholder?: string;
  label?: string | JSX.Element;
  description?: string;
  descriptionProps?: React.HTMLAttributes<HTMLParagraphElement>;
  className?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  Icon?: LucideIcon;
  InputProps?: Omit<InputProps, "name" | "type" | "placeholder">;
  labelProps?: LabelProps;
}) => {
  const { className: inputClassName, ...restInputProps } = InputProps || {};
  return (
    <FormField
      {...props}
      render={({ field, fieldState }) => (
        <FormItem className={className}>
          {!!label && <FormLabel {...labelProps}>{label}</FormLabel>}
          <div className="relative flex w-full items-center">
            <FormControl>
              <Input
                {...field}
                type={props?.type ?? "text"}
                {...restInputProps}
                placeholder={placeholder}
                className={cn(
                  {
                    "focus-visible:ring-destructive": fieldState.error,
                  },
                  inputClassName
                )}
              />
            </FormControl>

            {Icon && (
              <Icon className="absolute end-4 flex h-5 w-5 items-center text-gray-500" />
            )}
          </div>
          {description && (
            <FormDescription {...descriptionProps}>
              {description}
            </FormDescription>
          )}
          {showErrors && <FormMessage />}
        </FormItem>
      )}
    />
  );
};
