'use client';

import FormElements from './FormElements';
import FormBody from './FormBody';
import FormSettings from './FormSettings';
import { FC } from 'react';
import useFormBuilder from '@/hooks/useFormBuilder';
import { Extension, ExtensionSettings } from '@/types';
import { selectIcon } from '@/assets/icons';

const SelectInput = {
  slug: 'select',
  name: 'Select',
  settings: {
    options: ['Option 1', 'Option 2', 'Option 3'],
  },
  icon: selectIcon,
  render: (settings: ExtensionSettings) => (
    <select>
      {settings.options?.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  ),
};

export const extensions: any[] = [
  SelectInput,
  // {
  //   id: 0,
  //   slug: 'select',
  //   name: 'Select',
  //   settings: { options: [] },
  // },
  // {
  //   id: 0,
  //   slug: 'radioGroup',
  //   name: 'Radio Group',
  //   settings: { options: [] },
  // },
  // { id: 0, slug: 'checkbox', name: 'Checkbox', settings: {} },
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
