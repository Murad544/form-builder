'use client';

import { Field } from '@/store/slices/formBuilderSlice';

interface FormElement {
  name: string;
  accessor: string;
}

const formElements = [
  {
    name: 'Label',
    accessor: 'label',
  },
  {
    name: 'Text Input',
    accessor: 'textInput',
  },
  {
    name: 'Textarea',
    accessor: 'textarea',
  },
  {
    name: 'Number Input',
    accessor: 'numberInput',
  },
  {
    name: 'Date Input',
    accessor: 'dateInput',
  },
  {
    name: 'Time Input',
    accessor: 'timeInput',
  },
  {
    name: 'Select',
    accessor: 'select',
  },
  {
    name: 'Check-box',
    accessor: 'checkbox',
  },
  {
    name: 'Radio-Buttons',
    accessor: 'radioButtons',
  },
  {
    name: 'File',
    accessor: 'file',
  },
  {
    name: 'Link',
    accessor: 'link',
  },
  {
    name: 'Email',
    accessor: 'email',
  },
  {
    name: 'Phone',
    accessor: 'phone',
  },
];

const SideBar = () => {
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    field: FormElement,
  ) => {
    e.dataTransfer.setData('text/plain', field.name);
    e.dataTransfer.setData('accessor', field.accessor);
  };
  return (
    <div className='grid grid-cols-2 gap-1'>
      {formElements.map((field, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, field)}
          className='p-2 bg-gray-100 rounded-md hover:bg-gray-200'
        >
          {field.name}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
