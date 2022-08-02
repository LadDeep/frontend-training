import React from "react";

export const Input = ({className, type, value, onChange}) => {
  return (
    <input
      className={className}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
