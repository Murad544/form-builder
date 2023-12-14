'use client';

import { DragEvent, useRef } from 'react';
import { Extension } from '@/types';
import { extensions } from './FormBuilder';
import styles from '@/styles/componentStyles/form.module.scss';
import { dragIcon, trashIcon } from '@/assets/icons';

interface Props {
  elements: Extension[];
  addElement: (slug: Extension) => void;
  removeElement: (id: number) => void;
  reorderElements: (dragItem: number, dragOverItem: number) => void;
  selectedElement: Extension | undefined;
  setSelectedElementId: (id: number) => void;
}

const FormBody = ({
  elements,
  addElement,
  removeElement,
  reorderElements,
  selectedElement,
  setSelectedElementId,
}: Props) => {
  const dragItem = useRef(0);
  const dragOverItem = useRef(0);

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const isInForm = e.dataTransfer.getData('isInForm');
    const extension =
      isInForm !== 'true' &&
      JSON?.parse(e.dataTransfer.getData('extension') ?? '');
    if (isInForm !== 'true') {
      addElement(extension);
    }
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    position: any,
  ) => {
    e.dataTransfer.setData('isInForm', 'true');
    dragItem.current = position;
  };

  const handleDragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    position: any,
  ) => {
    dragOverItem.current = position;
  };

  const renderField: (ext: Extension) => Extension = (ext: Extension) => {
    return (
      extensions.find(
        (extension) => extension.extensionId === ext.extensionId,
      ) ?? ({} as Extension)
    );
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`${styles.section} ${styles.editor}`}
    >
      <h2>Editor</h2>
      <form>
        {elements.map((field, index) => (
          <div
            key={field.id}
            draggable
            onClick={() => setSelectedElementId(field.id as number)}
            onDragStart={(e) => {
              handleDragStart(e, index);
              setSelectedElementId(field.id as number);
            }}
            onDragEnter={(e) => handleDragEnter(e, index)}
            onDrop={() =>
              reorderElements(dragItem.current, dragOverItem.current)
            }
            className={styles.form_element}
          >
            <div
              className={`${
                selectedElement?.id === field.id && styles.selected
              }`}
            >
              <label>{field?.settings?.label}</label>
              {/* rendering your custom component here */}
              {/* @ts-ignore */}
              {renderField(field)?.render(field?.settings)}
              <div>{field?.settings?.helperText}</div>
            </div>
            {selectedElement?.id === field.id && (
              <div className={styles.drag_container}>
                <div
                  onClick={() => removeElement(field.id as number)}
                  className={styles.trash_icon}
                >
                  {trashIcon}
                </div>
                <div className={styles.drag_icon}>{dragIcon}</div>
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormBody;
