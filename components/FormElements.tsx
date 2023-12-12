'use client';

import { Extension } from '@/types';

interface Props {
  extensions: Extension[];
}
const FormElements = ({ extensions }: Props) => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    field: Extension,
  ) => {
    e.dataTransfer.setData('extension', JSON.stringify(field));
  };
  return (
    <div className=' relative'>
      <h2 className='text-xl font-semibold mb-2 fixed w-full bg-white border-b-2 z-10'>
        Elements
      </h2>
      <div className='grid grid-cols-2 gap-5 pt-10'>
        {extensions.map((field, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, field)}
            className='p-2 bg-gray-100 rounded-md hover:bg-gray-200 h-20 flex items-center justify-center'
          >
            {field.icon}
            {field.slug}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormElements;
