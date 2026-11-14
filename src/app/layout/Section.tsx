import React from "react";

interface SectionProps {
  className?: string;
  id?: string;
  children: React.ReactNode;
  bgColor?: string;
}

const Section: React.FC<SectionProps> = ({
  className,
  id,
  children,
  bgColor,
}) => {
  const styles: React.CSSProperties = {
    background: bgColor,
    width: "100%",
  };

  return (
    <div
      id={id}
      className={`relative flex flex-col md:flex-row min-w-[399px] 
   ${className || ""}`}
      style={styles}
    >
      {/* Content */}
      <div className="relative z-10 min-w-full">{children}</div>
    </div>
  );
};

export default Section;
