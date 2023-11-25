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
    const accessor = e.dataTransfer.getData('accessor');
    const newField: Field = {
      name: field,
      accessor,
      // Add default values for other properties as needed
    };
    console.log(newField);
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
        return <input className='border border-gray-300' type='text' />;
      case 'textarea':
        return <textarea className='border border-gray-300' />;
      case 'numberInput':
        return <input className='border border-gray-300' type='number' />;
      case 'dateInput':
        return <input className='border border-gray-300' type='date' />;
      case 'timeInput':
        return <input className='border border-gray-300' type='time' />;
      case 'select':
        return (
          <select className='border border-gray-300'>
            <option value=''>Select an option</option>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </select>
        );
      case 'checkbox':
        return (
          <div className='flex items-center'>
            <input className='border border-gray-300' type='checkbox' />
            <label className='ml-2'>Checkbox</label>
          </div>
        );
      case 'radioButtons':
        return (
          <div className='flex items-center'>
            <input className='border border-gray-300' type='radio' />
            <label className='ml-2'>Radio Button</label>
          </div>
        );
      case 'file':
        return <input className='border border-gray-300' type='file' />;
      case 'link':
        return <input className='border border-gray-300' type='url' />;
      case 'email':
        return <input className='border border-gray-300' type='email' />;
      case 'phone':
        return <input className='border border-gray-300' type='tel' />;
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
