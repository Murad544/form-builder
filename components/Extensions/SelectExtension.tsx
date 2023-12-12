import { ExtensionSettings } from '@/types';
import React, { FC } from 'react';

const SelectExtension: FC<ExtensionSettings> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <select>
        {options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectExtension;
