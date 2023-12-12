'use client';

import { DragEvent, useRef } from 'react';
import { Extension } from '@/types';
import { extensions } from './FormBuilder';

interface Props {
  elements: Extension[];
  addElement: (slug: Extension) => void;
  removeElement: (id: number) => void;
  reorderElements: (dragItem: number, dragOverItem: number) => void;
  setSelectedElementId: (id: number) => void;
}

const FormBody = ({
  elements,
  addElement,
  removeElement,
  reorderElements,
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

  const renderField = (ext: Extension) => {
    return extensions.find(
      (extension) => extension.extensionId === ext.extensionId,
    );
  };
  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className='border border-dashed border-gray-300  min-h-[200px] col-span-2 max-h-[100vh] overflow-y-auto relative'
    >
      <h2 className='text-xl font-semibold mb-2 fixed bg-white border-b-2 w-full z-20 pl-4'>
        Form
      </h2>
      <form className='grid grid-cols-12 gap-4 p-4 pt-10'>
        {elements.map((field, index) => (
          <div
            key={field.id}
            className={`relative col-span-12`}
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
          >
            <div className='cursor-pointer p-2 bg-gray-100 rounded-md hover:bg-gray-200'>
              <label>{field?.settings?.label}</label>
              {/* rendering your custom component here */}
              {renderField(field)?.render(field?.settings)}
              <div>{field?.settings?.helperText}</div>
            </div>
            <button
              onClick={() => removeElement(field.id as number)}
              className='absolute top-0 right-0 bg-red-500 text-white rounded-full hover:bg-red-600 w-6 h-6 z-1'
              type='button'
            >
              x
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default FormBody;
