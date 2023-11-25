'use client';

import SideBar from './SideBar';
import FormBody from './FormBody';
import RigthSideBar from './RigthSideBar';

const FormBuilder: React.FC = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <SideBar />
      <FormBody />
      <RigthSideBar />
    </div>
  );
};

export default FormBuilder;
