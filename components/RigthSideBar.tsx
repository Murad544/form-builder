import { RootState } from '@/store/store';
import React from 'react';
import { useSelector } from 'react-redux';

const RigthSideBar = () => {
  const selectedField = useSelector(
    (state: RootState) => state.formBuilder.selectedField,
  );
  return (
    <div className='ml-4 col-span-1'>
      {selectedField && (
        <div>
          <h3 className='text-xl font-semibold mb-2'>Field Properties</h3>
          <p>Selected Field: {selectedField.name}</p>
        </div>
      )}
    </div>
  );
};

export default RigthSideBar;
