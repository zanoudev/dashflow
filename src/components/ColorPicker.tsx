import React, { useState } from "react";

const COLORS = [
  // Greys
 "#6C757D", "#ADB5BD", "#CED4DA", "#DEE2E6", "#E9ECEF", "#F8F9FA",
  // Blues
  "#1E3A8A", "#1D4ED8", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE",
  // Reds
  "#7F1D1D", "#B91C1C", "#DC2626", "#EF4444", "#F87171", "#FCA5A5",
  // Greens
  "#065F46", "#047857", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0",
  // Purples
  "#4C1D95", "#6D28D9", "#8B5CF6", "#A78BFA", "#C4B5FD", "#DDD6FE",
  // Yellows
  "#92400E", "#D97706", "#F59E0B", "#FBBF24", "#FCD34D", "#FDE68A",
  // Teals
  "#0D9488", "#14B8A6", "#2DD4BF", "#5EEAD4", "#99F6E4", "#CCFBF1"
];
const ColorPicker = ({ selectedColor, onChange }: { selectedColor: string; onChange: (color: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className="w-10 h-10 border rounded cursor-pointer"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>

      {isOpen && (
        <div className="absolute z-10 grid grid-cols-6 gap-2 p-2 bg-white border rounded shadow-md mt-2">
          {COLORS.map((color) => (
            <div
              key={color}
              className="w-8 h-8 cursor-pointer border rounded"
              style={{ backgroundColor: color }}
              onClick={() => {
                onChange(color);
                setIsOpen(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
