'use client';

import { Extension, ExtensionSettings } from '@/types';
import React, { ChangeEvent } from 'react';
import { extensions } from './FormBuilder';

interface Props {
  selectedElement: Extension | undefined;
  handlePropsChange: (id: number, key: string, value: any) => void;
}

const FormSettings = ({ selectedElement, handlePropsChange }: Props) => {
  const settings = selectedElement?.settings;

  const handleSettingChange = (value: any, key: any) => {
    selectedElement?.id && handlePropsChange(selectedElement?.id, key, value);
  };
  const currentSettings = extensions.find(
    (extension) => extension.extensionId === selectedElement?.extensionId,
  );
  return (
    <div className='col-span-1 overflow-y-auto relative overflow-y-auto'>
      <h2 className='text-xl font-semibold mb-2 fixed w-full bg-white border-b-2 z-30'>
        Options
      </h2>
      <div className='grid gap-3 pt-10'>
        {currentSettings?.renderSettings &&
          currentSettings?.renderSettings(
            settings as ExtensionSettings,
            handleSettingChange,
          )}
      </div>
    </div>
  );
};

export default FormSettings;
