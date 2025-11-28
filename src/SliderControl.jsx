// SliderControl.jsx
import React from 'react';

export default function SliderControl({ label, icon: Icon, value, onChange, min, max }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-gray-600 text-xs uppercase font-bold flex items-center gap-2">
          {Icon && <Icon size={12} />} {label}
        </label>
        <span className="text-xs text-gray-500 font-mono">{value}</span>
      </div>
      <div className="flex gap-2 items-center">
        <input 
          type="range" 
          min={min} 
          max={max} 
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-colors"
        />
        <input 
          type="number" 
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-12 bg-white border border-gray-300 rounded text-xs p-1 text-center text-gray-700 focus:border-blue-500 focus:outline-none shadow-sm"
        />
      </div>
    </div>
  );
}
