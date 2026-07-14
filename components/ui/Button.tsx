"use client";

import React from "react";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  asChild?: boolean;
  href?: string; // allow anchor href when rendering as an <a>
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  asChild = false,
  ...props
}, ref) => {
  // Base classes
  const baseClasses = "disabled:pointer-events-none disabled:opacity-50 transition-all duration-200";

  const v: ButtonVariant = variant ?? "primary";
  const s: ButtonSize = size ?? "md";

  // Variant classes
  const variantClasses = {
    primary: "bg-primary text-surface hover:bg-primary/90 focus:ring-2 focus:ring-primary/30",
    secondary: "bg-surface text-primary hover:bg-surface/90 border border-border-200 focus:ring-2 focus:ring-border/30",
    outline: "border border-primary text-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/30"
  }[v];

  // Size classes
  const sizeClasses = {
    sm: "px-3 py-2 text-sm font-medium",
    md: "px-4 py-3 text-base font-medium",
    lg: "px-6 py-4 text-lg font-medium"
  }[s];

  // Combine all classes
  const classes = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim();

  if (asChild || props.href) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        className={classes}
        // @ts-expect-error - disabled attribute not valid for anchor but kept for backward compatibility
        disabled={disabled}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
});

Button.displayName = "Button";

export default Button;