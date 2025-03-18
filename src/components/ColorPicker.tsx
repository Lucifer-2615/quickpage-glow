
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ColorPickerProps {
  id?: string;
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ id, color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentColor(color);
  }, [color]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const presetColors = [
    '#000000', '#ffffff', '#f8fafc', '#f1f5f9', 
    '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b',
    '#334155', '#1e293b', '#0f172a', '#020617',
    '#ef4444', '#f59e0b', '#10b981', '#3b82f6',
    '#6366f1', '#8b5cf6', '#d946ef', '#ec4899'
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full border-input h-10 flex items-center justify-between px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <div 
              className="h-6 w-6 rounded-full border" 
              style={{ backgroundColor: currentColor }}
            />
            <span className="text-sm">{currentColor}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3" align="start">
        <div className="space-y-3">
          <div className="grid grid-cols-5 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="h-6 w-6 rounded-full border border-muted flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  setCurrentColor(presetColor);
                  onChange(presetColor);
                }}
              >
                {presetColor === currentColor && (
                  <span className="text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col gap-2">
            <div>
              <Input
                ref={inputRef}
                id={id}
                type="color"
                value={currentColor}
                onChange={handleChange}
                className="sr-only"
              />
              <div 
                className="h-8 w-full rounded border cursor-pointer"
                style={{ backgroundColor: currentColor }}
                onClick={() => inputRef.current?.click()}
              />
            </div>
            
            <Input
              value={currentColor}
              onChange={handleChange}
              className="h-8"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorPicker;
