'use client';

import { Extension, ExtensionSettings } from '@/types';
import React from 'react';
import { extensions } from './FormBuilder';
import styles from '@/styles/componentStyles/form.module.scss';

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
    <div className={`${styles.section} ${styles.settings}`}>
      <h2>Settings</h2>
      <div className={styles.settings_container}>
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
