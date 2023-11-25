'use client';
import { useDispatch, useSelector } from 'react-redux';
import {
  Field,
  addFormField,
  deleteFormField,
  selectField,
} from '@/store/slices/formBuilderSlice';
import { RootState } from '@/store/store';
import SideBar from './SideBar';

const FormBuilder: React.FC = () => {
  const dispatch = useDispatch();
  const formFields = useSelector(
    (state: RootState) => state.formBuilder.formFields,
  );
  const selectedField = useSelector(
    (state: RootState) => state.formBuilder.selectedField,
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

  return (
    <div className='grid grid-cols-4 gap-4'>
      <SideBar />
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className='border border-dashed border-gray-300 p-4 min-h-[200px] col-span-2'
      >
        {formFields.map((field, index) => (
          <div key={index} className='relative'>
            <div
              onClick={() => handleFieldClick(field)}
              className='cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200'
            >
              {field.name}
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

      <div className='ml-4 col-span-1'>
        {selectedField && (
          <div>
            <h3 className='text-xl font-semibold mb-2'>Field Properties</h3>
            <p>Selected Field: {selectedField.name}</p>
            {/* Add more properties and customization options here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
