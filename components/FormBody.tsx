'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  Field,
  addFormField,
  deleteFormField,
  selectField,
} from '@/store/slices/formBuilderSlice';
import { RootState } from '@/store/store';

const FormBody = () => {
  const dispatch = useDispatch();
  const formFields = useSelector(
    (state: RootState) => state.formBuilder.formFields,
  );
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const field = e.dataTransfer.getData('text/plain');
    const newField: Field = {
      name: field,
      // Add default values for other properties as needed
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
    switch (field.name) {
      case 'Text Input':
        return <input type='text' />;
      case 'Textarea':
        return <textarea />;
      case 'Number Input':
        return <input type='number' />;
      case 'Date Input':
        return <input type='date' />;
      case 'Time Input':
        return <input type='time' />;
      case 'Select':
        return (
          <select>
            <option value='1'>Option 1</option>
            <option value='2'>Option 2</option>
            <option value='3'>Option 3</option>
          </select>
        );
      case 'Check-box':
        return (
          <div>
            <input type='checkbox' id='1' />
            <label htmlFor='1'>Option 1</label>
            <input type='checkbox' id='2' />
            <label htmlFor='2'>Option 2</label>
            <input type='checkbox' id='3' />
            <label htmlFor='3'>Option 3</label>
          </div>
        );
      case 'Radio-Buttons':
        return (
          <div>
            <input type='radio' id='1' />
            <label htmlFor='1'>Option 1</label>
            <input type='radio' id='2' />
            <label htmlFor='2'>Option 2</label>
            <input type='radio' id='3' />
            <label htmlFor='3'>Option 3</label>
          </div>
        );
      case 'File':
        return <input type='file' />;
      case 'Link':
        return <input type='url' />;
      case 'Email':
        return <input type='email' />;
      case 'Phone':
        return <input type='tel' />;
      default:
        return null;
    }
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className='border border-dashed border-gray-300 p-4 min-h-[200px] col-span-2 max-h-[100vh] overflow-y-auto'
    >
      {formFields.map((field, index) => (
        <div key={index} className='relative'>
          <div
            onClick={() => handleFieldClick(field)}
            className='cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200'
          >
            {field.name}
            {renderField(field)}
          </div>
          <button
            onClick={() => handleDeleteField(index)}
            className='absolute top-0 right-0 p-2 bg-red-500 text-white rounded-full hover:bg-red-600'
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormBody;
