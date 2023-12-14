'use client';

import { Extension } from '@/types';
import styles from '@/styles/componentStyles/form.module.scss';

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
    <div className={`${styles.section} ${styles.elements}`}>
      <h2>Elements</h2>
      <div className={styles.elements_container}>
        {extensions.map((field, index) => (
          <div
            key={index}
            draggable
            onDragStart={(e) => handleDragStart(e, field)}
          >
            {field.icon}
            {field.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormElements;
