'use client';

import FormElements from './FormElements';
import FormBody from './FormBody';
import FormSettings from './FormSettings';
import { FC } from 'react';
import useFormBuilder from '@/hooks/useFormBuilder';
import { Extension, ExtensionSettings } from '@/types';
import { inputIcon, selectIcon } from '@/assets/icons';

const TextInput = {
  extensionId: 0,
  slug: 'input',
  name: 'Input',
  settings: {},
  icon: inputIcon,
  render: (settings: ExtensionSettings) => (
    <input
      type='text'
      placeholder={settings.placeholder}
      value={(settings.value as string) ?? ''}
      onChange={settings.onChange}
    />
  ),
  renderSettings: (settings: ExtensionSettings, handlePropsChange: any) => (
    <>
      <div>
        <label htmlFor=''>Label</label>
        <input
          type='text'
          name='label'
          className='border border-gray-300 w-full mt-2'
          onChange={(e) => handlePropsChange(e.target.value, 'label')}
          value={settings?.label ?? ''}
        />
      </div>
    </>
  ),
};

const SelectInput = {
  extensionId: 1,
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
  renderSettings: (settings: ExtensionSettings, handlePropsChange: any) => (
    <>
      <div>
        <label htmlFor=''>Label</label>
        <input
          type='text'
          name='label'
          className='border border-gray-300 w-full mt-2'
          onChange={(e) => handlePropsChange(e.target.value, 'label')}
          value={settings?.label ?? ''}
        />
      </div>
      <div>
        <label>choices</label>
        <div className='flex flex-col mt-2'>
          {settings?.options?.map((option, index) => (
            <div key={index} className='flex items-center'>
              <input
                type='text'
                className='border border-gray-300 w-full'
                value={option}
                onChange={(e) =>
                  handlePropsChange(
                    settings.options?.map((opt, i) => {
                      if (i === index) {
                        return e.target.value;
                      }
                      return opt;
                    }),
                    'options',
                  )
                }
              />
              <button
                onClick={() =>
                  handlePropsChange(
                    settings.options?.filter((opt, i) => i !== index),
                    'options',
                  )
                }
                className='bg-red-500 text-white rounded-full hover:bg-red-600 w-6 h-6 ml-2'
                type='button'
              >
                x
              </button>
            </div>
          ))}
          <button
            onClick={() =>
              settings.options &&
              handlePropsChange([...settings.options, ''], 'options')
            }
            className='bg-green-500 text-white rounded-full hover:bg-green-600 w-6 h-6 ml-2'
            type='button'
          >
            +
          </button>
        </div>
      </div>
    </>
  ),
};

export const extensions: Extension[] = [SelectInput, TextInput];

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
