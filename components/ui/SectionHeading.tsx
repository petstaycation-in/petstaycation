import React from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}

const SectionHeading = ({
  title,
  description,
  className = "",
  center = false
}: SectionHeadingProps) => {
  const textAlign = center ? "text-center" : "text-left";

  return (
    <div className={`${textAlign} mb-12 ${className}`}>
      <h2 className="mb-4 text-2xl font-bold text-forest-green md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-gray-600 max-w-xl md:max-w-lg">
          {description}
        </p>
      )}
    </div>
  );
};

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;