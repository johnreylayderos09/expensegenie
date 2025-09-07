import React from "react";

export function Button({ children, className = "", onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 bg-amber-500 text-white hover:bg-amber-600 ${className}`}
    >
      {children}
    </button>
  );
}
