import React, { useState } from "react";

const COLORS = [
  "#ff0000", "#ff4500", "#ff8c00", "#ffd700", "#9acd32", "#32cd32", "#00fa9a",
  "#00ffff", "#1e90ff", "#0000ff", "#8a2be2", "#9400d3", "#ff1493", "#dc143c",
  "#8b0000", "#ffa07a", "#fa8072", "#ff6347", "#ffdab9", "#ffffe0", "#f0e68c"
];

const HexColorPicker = ({ selectedColor, onChange }: { selectedColor: string; onChange: (color: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Color preview box */}
      <div
        className="w-10 h-10 border rounded cursor-pointer"
        style={{ backgroundColor: selectedColor }}
        onClick={() => setIsOpen(!isOpen)}
      ></div>

      {/* Hexagonal grid */}
      {isOpen && (
        <div className="absolute z-10 bg-white border p-3 rounded-lg shadow-lg mt-2">
          <svg width="200" height="180" viewBox="0 0 200 180">
            {COLORS.map((color, index) => {
              const col = index % 5;
              const row = Math.floor(index / 5);
              const x = col * 30 + (row % 2 === 0 ? 15 : 0); // Offset every other row
              const y = row * 25;

              return (
                <polygon
                  key={color}
                  points="10,0 20,5 20,15 10,20 0,15 0,5"
                  transform={`translate(${x}, ${y})`}
                  fill={color}
                  stroke={color === selectedColor ? "#000" : "#fff"}
                  strokeWidth={color === selectedColor ? 2 : 1}
                  className="cursor-pointer"
                  onClick={() => {
                    onChange(color);
                    setIsOpen(false);
                  }}
                />
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
};

export default HexColorPicker;
