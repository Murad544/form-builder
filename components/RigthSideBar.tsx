'use client';

import { Field, editFormField } from '@/store/slices/formBuilderSlice';
import { RootState } from '@/store/store';
import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const RigthSideBar = () => {
  const dispatch = useDispatch();
  const selectedField = useSelector(
    (state: RootState) => state.formBuilder.selectedField,
  );

  type Keys =
    | 'label'
    | 'placeholder'
    | 'width'
    | 'visibility'
    | 'minLength'
    | 'maxLength'
    | 'helperText'
    | 'required'
    | 'choices';

  const hanleOptionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    const key: Keys = e.target.name as Keys;
    console.log(key, value);
    dispatch(editFormField({ ...selectedField, [key]: value }));
  };
  return (
    <div className='ml-4 col-span-1'>
      {selectedField && (
        <div>
          <h3 className='text-xl font-semibold mb-2'>Options</h3>

          <div>
            <label htmlFor=''>Label</label>
            <input
              type='text'
              name='label'
              className='border border-gray-300'
              onChange={hanleOptionChange}
              value={selectedField.label ?? ''}
            />
          </div>

          <div>
            <label htmlFor=''>Placeholder</label>
            <input
              type='text'
              name='placeholder'
              className='border border-gray-300'
              onChange={hanleOptionChange}
              value={selectedField.placeholder ?? ''}
            />
          </div>

          <div>
            <label htmlFor=''>Width</label>
            <select
              className='border border-gray-300'
              name='width'
              onChange={hanleOptionChange}
              value={selectedField.width}
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
              className='border border-gray-300'
              name='visibility'
              onChange={hanleOptionChange}
              value={selectedField.visibility}
            >
              <option value={'visible'}>visible</option>
              <option value={'hidden'}>hidden</option>
            </select>
          </div>

          <div className='grid grid-cols-2 gap-1'>
            <div className='col-span-1'>
              <label htmlFor=''>Min length</label>
              <input
                type='text'
                name='minLength'
                className='border border-gray-300 w-full'
                onChange={hanleOptionChange}
                value={selectedField.minLength ?? ''}
              />
            </div>
            <div className='col-span-1'>
              <label htmlFor=''>Min length</label>
              <input
                type='text'
                name='maxLength'
                className='border border-gray-300 w-full'
                onChange={hanleOptionChange}
                value={selectedField.maxLength ?? ''}
              />
            </div>
          </div>

          <div>
            <label htmlFor=''>Helper text</label>
            <input
              type='text'
              name='helperText'
              className='border border-gray-300'
              onChange={hanleOptionChange}
              value={selectedField.helperText ?? ''}
            />
          </div>

          {selectedField.accessor === ''}
        </div>
      )}
    </div>
  );
};

export default RigthSideBar;
