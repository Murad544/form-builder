'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  Field,
  addFormField,
  deleteFormField,
  selectField,
} from '@/store/slices/formBuilderSlice';
import { RootState } from '@/store/store';
import { v4 as uuidv4 } from 'uuid';
import { DragEvent } from 'react';

const FormBody = () => {
  const dispatch = useDispatch();
  const { formFields, selectedField } = useSelector(
    (state: RootState) => state.formBuilder,
  );
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const name = e.dataTransfer.getData('name');
    const accessor = e.dataTransfer.getData('accessor');
    const newField: Field = {
      id: uuidv4(),
      name,
      label: name,
      accessor,
      visibility: 'visible',
      width: 'col-span-12',
    };
    dispatch(addFormField(newField));
  };

  const handleFieldClick = (field: Field) => {
    dispatch(selectField(field));
  };

  const handleDeleteField = (index: number) => {
    dispatch(deleteFormField(index));
  };

  const renderField = (field: Field) => {
    switch (field.accessor) {
      case 'textInput':
        return (
          <input
            className='border border-gray-300 w-full'
            type='text'
            {...field}
          />
        );
      case 'textarea':
        return (
          <textarea className='border border-gray-300 w-full' {...field} />
        );
      case 'numberInput':
        return (
          <input
            className='border border-gray-300 w-full'
            type='number'
            {...field}
          />
        );
      case 'dateInput':
        return (
          <input
            className='border border-gray-300 w-full'
            type='date'
            {...field}
          />
        );
      case 'timeInput':
        return (
          <input
            className='border border-gray-300 w-full'
            type='time'
            {...field}
          />
        );
      case 'select':
        return (
          <select className='border border-gray-300 w-full'>
            {field.choices?.map((choice, index) => (
              <option key={index} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <input
            className='border border-gray-300'
            type='checkbox'
            {...field}
          />
        );
      case 'radioButtons':
        return (
          <div className='grid'>
            {field.choices?.map((choice, index) => (
              <div key={index}>
                <label htmlFor=''>{choice}</label>
                <input
                  className='border border-gray-300 ml-2'
                  type='radio'
                  {...field}
                />
              </div>
            ))}
          </div>
        );
      case 'file':
        return (
          <input
            className='border border-gray-300 w-full'
            type='file'
            {...field}
          />
        );
      case 'link':
        return (
          <input
            className='border border-gray-300 w-full'
            type='url'
            {...field}
          />
        );
      case 'email':
        return (
          <input
            className='border border-gray-300 w-full'
            type='email'
            {...field}
          />
        );
      case 'phone':
        return (
          <input
            className='border border-gray-300 w-full'
            type='tel'
            {...field}
          />
        );
      default:
        return null;
    }
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className='border border-dashed border-gray-300  min-h-[200px] col-span-2 max-h-[100vh] overflow-y-auto relative'
    >
      <h2 className='text-xl font-semibold mb-2 fixed bg-white border-b-2 w-full z-20 pl-4'>
        Form
      </h2>
      <form className='grid grid-cols-12 gap-4 p-4 pt-10'>
        {formFields.map(
          (field, index) =>
            field.visibility === 'visible' && (
              <div
                key={field.id}
                className={`relative ${field.width} ${
                  field.id === selectedField?.id && 'border border-gray-700'
                }`}
              >
                <div
                  onClick={() => handleFieldClick(field)}
                  className='cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200'
                >
                  <label>{field.label}</label>
                  {renderField(field)}
                  <div>{field.helperText}</div>
                </div>
                <button
                  onClick={() => handleDeleteField(index)}
                  className='absolute top-0 right-0 bg-red-500 text-white rounded-full hover:bg-red-600 w-6 h-6 z-1'
                >
                  x
                </button>
              </div>
            ),
        )}
      </form>
    </div>
  );
};

export default FormBody;
