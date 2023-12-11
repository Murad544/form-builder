import { ExtensionProps } from '@/types';
import React, { FC } from 'react';

const RadioGroup: FC<ExtensionProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div>
      {label && <label>{label}</label>}

      {options?.map((option, index) => (
        <div key={index}>
          <input type='radio' id='huey' name='drone' value='huey' />
          <label>{option}</label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
