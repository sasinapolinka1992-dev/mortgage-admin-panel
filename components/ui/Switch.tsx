import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  return (
    <div className="inline-flex items-center">
        <div className="UNI_checkbox">
            <input 
                type="checkbox" 
                checked={checked} 
                onChange={(e) => onChange(e.target.checked)} 
            />
            <div className="fake"></div>
        </div>
        {label && <span className="ml-3 text-sm font-medium text-gray-700 cursor-pointer" onClick={() => onChange(!checked)}>{label}</span>}
    </div>
  );
};