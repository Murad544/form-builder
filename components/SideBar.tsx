'use client';

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
    e.dataTransfer.setData('name', field.name);
    e.dataTransfer.setData('accessor', field.accessor);
  };
  return (
    <div className=' relative'>
      <h2 className='text-xl font-semibold mb-2 fixed w-full bg-white border-b-2 z-10'>
        Elements
      </h2>
      <div className='grid grid-cols-2 gap-5 pt-10'>
        {formElements.map((field, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, field)}
            className='p-2 bg-gray-100 rounded-md hover:bg-gray-200 h-20 flex items-center justify-center'
          >
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
