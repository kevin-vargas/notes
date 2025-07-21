"use client";

import { useState } from "react";

export function TagInput({ value = [], onChange, placeholder = "Add a tag..." }: {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const tag = inputValue.trim();
    if (tag && !value.includes(tag)) {
      onChange?.([...value, tag]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange?.(value.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="border border-gray-300 rounded p-2 min-h-10">
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span key={tag} className="bg-gray-200 rounded px-2 py-1 text-sm flex items-center gap-1">
            {tag}
            <button onClick={() => removeTag(tag)} className="hover:bg-gray-300 rounded px-1">
              ×
            </button>
          </span>
        ))}
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
          placeholder={placeholder}
          className="flex-1 outline-none min-w-20"
        />
      </div>
    </div>
  );
}