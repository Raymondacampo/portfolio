import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const variants: Record<ButtonVariant, string> = {
  primary: "border-lime bg-lime text-background hover:bg-lime/90",
  secondary:
    "border-line bg-panel text-foreground hover:border-link hover:text-link",
};

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center rounded-full border px-4 py-2 font-sans text-sm font-semibold tracking-wide",
        "transition-[background-color,border-color,color,transform] duration-[160ms] ease-[ease] hover:-translate-y-0.5",
        "motion-reduce:transition-[background-color,border-color,color] motion-reduce:hover:translate-y-0",
        "disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}
