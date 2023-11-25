'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import SideBar from './SideBar';
import FormBody from './FormBody';

const FormBuilder: React.FC = () => {
  const selectedField = useSelector(
    (state: RootState) => state.formBuilder.selectedField,
  );

  return (
    <div className='grid grid-cols-4 gap-4'>
      <SideBar />
      <FormBody />
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
