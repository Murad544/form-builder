'use client';

import FormElements from './FormElements';
import FormBody from './FormBody';
import FormSettings from './FormSettings';
import { FC } from 'react';
import useFormBuilder from '@/hooks/useFormBuilder';
import { Extension, ExtensionSettings } from '@/types';
import {
  closeIcon,
  inputIcon,
  plusIcon,
  radioIcon,
  selectIcon,
} from '@/assets/icons';

import styles from '@/styles/componentStyles/form.module.scss';

//You can add your custom extensions here:

const TextInput = {
  extensionId: 0,
  slug: 'input',
  name: 'Input',
  settings: {},
  icon: inputIcon,
  render: (settings: ExtensionSettings) => (
    <input type='text' placeholder={settings.placeholder} />
  ),
  renderSettings: (settings: ExtensionSettings, handlePropsChange: any) => (
    <div className={styles.custom_settings}>
      <div>
        <label htmlFor=''>Label</label>
        <input
          type='text'
          name='label'
          onChange={(e) => handlePropsChange(e.target.value, 'label')}
          value={settings?.label ?? ''}
        />
      </div>
      <div>
        <label htmlFor=''>Placeholder</label>
        <input
          type='text'
          name='placeholder'
          onChange={(e) => handlePropsChange(e.target.value, 'placeholder')}
          value={settings?.placeholder ?? ''}
        />
      </div>
    </div>
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
    <div className={styles.custom_settings}>
      <div>
        <label htmlFor=''>Label</label>
        <input
          type='text'
          name='label'
          onChange={(e) => handlePropsChange(e.target.value, 'label')}
          value={settings?.label ?? ''}
        />
      </div>
      <div className={styles.choices_container}>
        <label>Choices</label>
        {settings?.options?.map((option, index) => (
          <div key={index} className={styles.choice}>
            <input
              type='text'
              value={option ?? ''}
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
              type='button'
            >
              {closeIcon}
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            settings.options &&
            handlePropsChange([...settings.options, ''], 'options')
          }
          type='button'
          className={styles.add_choice}
        >
          {plusIcon}
        </button>
      </div>
    </div>
  ),
};

const RadioGroup = {
  extensionId: 2,
  slug: 'radio-group',
  name: 'Radio group',
  settings: {
    options: ['Option 1', 'Option 2', 'Option 3'],
    label: 'Experience',
  },
  icon: radioIcon,
  render: (settings: ExtensionSettings) => (
    <div className={styles.radio_group}>
      {settings.options?.map((option, index) => (
        <div key={index}>
          <input type='radio' name='radio' value={option} />
          <label htmlFor=''>{option}</label>
        </div>
      ))}
    </div>
  ),
  renderSettings: (settings: ExtensionSettings, handlePropsChange: any) =>
    SelectInput.renderSettings(settings, handlePropsChange),
};

export const extensions: Extension[] = [SelectInput, TextInput, RadioGroup];

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
    <div className={styles.form_builder_container}>
      <FormElements extensions={extensions} />
      <FormBody
        elements={elements}
        addElement={addElement}
        removeElement={removeElement}
        reorderElements={reorderElements}
        selectedElement={selectedElement}
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
