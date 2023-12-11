'use client';

import SideBar from './SideBar';
import FormBody from './FormBody';
import RigthSideBar from './RigthSideBar';
import { FC } from 'react';
import useFormBuilder from '@/hooks/useFormBuilder';

const FormBuilder: FC = () => {
  const {
    elements,
    addElement,
    removeElement,
    reorderElements,
    selectedElement,
    handlePropsChange,
  } = useFormBuilder();
  return (
    <div className='grid grid-cols-4 gap-4'>
      <SideBar />
      <FormBody
        elements={elements}
        addElement={addElement}
        removeElement={removeElement}
        reorderElements={reorderElements}
      />
      <RigthSideBar
        selectedElement={selectedElement}
        handlePropsChange={handlePropsChange}
      />
    </div>
  );
};

export default FormBuilder;
