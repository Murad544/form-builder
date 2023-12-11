'use client';

import { Field } from '@/store/slices/formBuilderSlice';
import React, { ChangeEvent } from 'react';
import Choices from './Choices';

const widtOptions = [
  'col-span-1',
  'col-span-2',
  'col-span-3',
  'col-span-4',
  'col-span-5',
  'col-span-6',
  'col-span-7',
  'col-span-8',
  'col-span-9',
  'col-span-10',
  'col-span-11',
  'col-span-12',
];

type Keys = keyof Field;

const RigthSideBar = ({ selectedElement, handlePropsChange }: any) => {
  const settings = selectedElement?.props;

  const hanleOptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    const key: Keys = e.target.name as Keys;
    selectedElement?.id && handlePropsChange(selectedElement?.id, key, value);
  };

  const hanleRequiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    const key: Keys = e.target.name as Keys;
    selectedElement?.id && handlePropsChange(selectedElement?.id, key, value);
  };

  const showChoices =
    selectedElement?.accessor === 'radioGroup' ||
    selectedElement?.accessor === 'select';
  return (
    <div className='col-span-1 overflow-y-auto relative overflow-y-auto'>
      <h2 className='text-xl font-semibold mb-2 fixed w-full bg-white border-b-2 z-30'>
        Options
      </h2>
      <div className='grid gap-3 pt-10'>
        <div>
          <label htmlFor=''>Label</label>
          <input
            type='text'
            name='label'
            className='border border-gray-300 w-full mt-2'
            onChange={hanleOptionChange}
            // value={settings?.label}
          />
        </div>

        <div>
          <label htmlFor=''>Placeholder</label>
          <input
            type='text'
            name='placeholder'
            className='border border-gray-300 w-full mt-2'
            onChange={hanleOptionChange}
            value={settings?.placeholder ?? ''}
          />
        </div>

        <div>
          <label htmlFor=''>Width</label>
          <select
            className='border border-gray-300 w-full mt-2'
            name='width'
            onChange={hanleOptionChange}
            value={settings?.width}
            defaultValue={'col-span-12'}
          >
            {widtOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor=''>Visibility</label>
          <select
            className='border border-gray-300 w-full mt-2'
            name='visibility'
            onChange={hanleOptionChange}
            value={settings?.visibility}
          >
            <option value={'visible'}>visible</option>
            <option value={'hidden'}>hidden</option>
          </select>
        </div>
        {selectedElement?.accessor.includes('Input') && (
          <div className='grid grid-cols-2 gap-1'>
            <div className='col-span-1'>
              <label htmlFor=''>Min length</label>
              <input
                type='number'
                name='minLength'
                className='border border-gray-300 w-full mt-2 w-full mt-2'
                onChange={hanleOptionChange}
                value={settings?.minLength ?? ''}
              />
            </div>
            <div className='col-span-1'>
              <label htmlFor=''>Min length</label>
              <input
                type='number'
                name='maxLength'
                className='border border-gray-300 w-full mt-2 w-full mt-2'
                onChange={hanleOptionChange}
                value={settings?.maxLength ?? ''}
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor=''>Helper text</label>
          <input
            type='text'
            name='helperText'
            className='border border-gray-300 w-full mt-2'
            onChange={hanleOptionChange}
            value={settings?.helperText ?? ''}
          />
        </div>

        <div>
          <label htmlFor=''>Required</label>
          <input
            type='checkbox'
            name='required'
            className='border border-gray-300 ml-2'
            onChange={hanleRequiredChange}
            checked={settings?.required ?? false}
          />
        </div>

        {showChoices && <Choices />}
      </div>
    </div>
  );
};

export default RigthSideBar;
