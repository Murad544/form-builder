import { ExtensionSettings } from '@/types';
import React, { FC } from 'react';

const InputExtension: FC<ExtensionSettings> = ({
  label,
  placeholder,
  value,
  onChange,
  type,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type='text'
        placeholder={placeholder}
        value={(value as string) ?? ''}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default InputExtension;
