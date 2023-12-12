'use client';

import FormElements from './FormElements';
import FormBody from './FormBody';
import FormSettings from './FormSettings';
import { FC } from 'react';
import useFormBuilder from '@/hooks/useFormBuilder';

export const extensions: any[] = [
  { id: 'input', extension: 'input', label: 'Input', settings: {} },
  {
    id: 'select',
    extension: 'select',
    label: 'Select',
    settings: { options: [] },
  },
  {
    id: 'radioGroup',
    extension: 'radioGroup',
    label: 'Radio Group',
    settings: { options: [] },
  },
  { id: 'checkbox', extension: 'checkbox', label: 'Checkbox', settings: {} },
];

const FormBuilder: FC = () => {
  const {
    elements,
    addElement,
    removeElement,
    reorderElements,
    selectedElement,
    handlePropsChange,
    setSelectedElementId,
  } = useFormBuilder();
  return (
    <div className='grid grid-cols-4 gap-4'>
      <FormElements extensions={extensions} />
      <FormBody
        elements={elements}
        addElement={addElement}
        removeElement={removeElement}
        reorderElements={reorderElements}
        setSelectedElementId={setSelectedElementId}
      />
      <FormSettings
        selectedElement={selectedElement}
        handlePropsChange={handlePropsChange}
      />
    </div>
  );
};

export default FormBuilder;
