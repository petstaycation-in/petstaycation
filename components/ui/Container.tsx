import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

const Container = ({ children, className = "", fluid = false }: ContainerProps) => {
  const classes = fluid
    ? "w-full px-4 sm:px-6 lg:px-8 mx-auto"
    : "max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto";

  return (
    <div className={`bg-background ${classes} ${className}`}>
      {children}
    </div>
  );
};

Container.displayName = "Container";

export default Container;