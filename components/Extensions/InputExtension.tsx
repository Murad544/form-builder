import { ExtensionProps } from '@/types';
import React, { FC } from 'react';

const InputExtension: FC<ExtensionProps> = ({
  id,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type='text'
        placeholder={placeholder}
        // value={(value as string) ?? ''}
        // onChange={(e) => onChange && onChange(e.target.value)}
      />
    </div>
  );
};

export default InputExtension;
