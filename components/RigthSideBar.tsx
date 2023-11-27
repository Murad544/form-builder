'use client';

import { Field, editFormField } from '@/store/slices/formBuilderSlice';
import { RootState } from '@/store/store';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const RigthSideBar = () => {
  const dispatch = useDispatch();
  const selectedField = useSelector(
    (state: RootState) => state.formBuilder.selectedField,
  );

  const hanleOptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    console.log(value);
    const key: Keys = e.target.name as Keys;
    selectedField &&
      dispatch(editFormField({ ...selectedField, [key]: value }));
  };

  const hanleRequiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    const key: Keys = e.target.name as Keys;
    selectedField &&
      dispatch(editFormField({ ...selectedField, [key]: value }));
  };

  const showChoices =
    selectedField?.accessor === 'radioButtons' ||
    selectedField?.accessor === 'select';
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
            value={selectedField?.label ?? ''}
          />
        </div>

        <div>
          <label htmlFor=''>Placeholder</label>
          <input
            type='text'
            name='placeholder'
            className='border border-gray-300 w-full mt-2'
            onChange={hanleOptionChange}
            value={selectedField?.placeholder ?? ''}
          />
        </div>

        <div>
          <label htmlFor=''>Width</label>
          <select
            className='border border-gray-300 w-full mt-2'
            name='width'
            onChange={hanleOptionChange}
            value={selectedField?.width}
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
            value={selectedField?.visibility}
          >
            <option value={'visible'}>visible</option>
            <option value={'hidden'}>hidden</option>
          </select>
        </div>
        {selectedField?.accessor.includes('Input') && (
          <div className='grid grid-cols-2 gap-1'>
            <div className='col-span-1'>
              <label htmlFor=''>Min length</label>
              <input
                type='number'
                name='minLength'
                className='border border-gray-300 w-full mt-2 w-full mt-2'
                onChange={hanleOptionChange}
                value={selectedField?.minLength ?? ''}
              />
            </div>
            <div className='col-span-1'>
              <label htmlFor=''>Min length</label>
              <input
                type='number'
                name='maxLength'
                className='border border-gray-300 w-full mt-2 w-full mt-2'
                onChange={hanleOptionChange}
                value={selectedField?.maxLength ?? ''}
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
            value={selectedField?.helperText ?? ''}
          />
        </div>

        <div>
          <label htmlFor=''>Required</label>
          <input
            type='checkbox'
            name='required'
            className='border border-gray-300 ml-2'
            onChange={hanleRequiredChange}
            checked={selectedField?.required ?? false}
          />
        </div>

        {showChoices && <Choices />}
      </div>
    </div>
  );
};

export default RigthSideBar;
