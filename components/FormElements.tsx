'use client';

import { Extension } from '@/types';

interface FormElement {
  name: string;
  slug: string;
}
const FormElements = ({ extensions }: any) => {
  // const renderField = (ext: Extension) => {
  //   return extensions.find(
  //     (extension) => extension.slug === ext.slug && extension,
  //   );
  // };
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    field: FormElement,
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
            {field.slug}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormElements;
