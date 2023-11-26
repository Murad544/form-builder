'use client';

import SideBar from './SideBar';
import FormBody from './FormBody';
import RigthSideBar from './RigthSideBar';
import { FC } from 'react';

const FormBuilder: FC = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      <SideBar />
      <FormBody />
      <RigthSideBar />
    </div>
  );
};

export default FormBuilder;
