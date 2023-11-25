'use client';
import { useState } from 'react';

const FormBuilder = () => {
  const [formFields, setFormFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const handleDragStart = (e, field) => {
    e.dataTransfer.setData('text/plain', field);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const field = e.dataTransfer.getData('text/plain');
    setFormFields((prevFields) => [...prevFields, field]);
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: '2px dashed #ccc',
            padding: '20px',
            minHeight: '200px',
            flex: '1',
          }}
        >
          {formFields.map((field, index) => (
            <div
              key={index}
              onClick={() => handleFieldClick(field)}
              style={{ cursor: 'pointer' }}
            >
              {field}
            </div>
          ))}
        </div>

        <div style={{ marginLeft: '20px', flex: '1' }}>
          {selectedField && (
            <div>
              <h3>Field Properties</h3>
              <p>Selected Field: {selectedField}</p>
              {/* Add more properties and customization options here */}
            </div>
          )}
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'Text Input')}
          style={{
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            cursor: 'move',
          }}
        >
          Text Input
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'Checkbox')}
          style={{
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            cursor: 'move',
          }}
        >
          Checkbox
        </div>
        <div
          draggable
          onDragStart={(e) => handleDragStart(e, 'Radio Button')}
          style={{
            margin: '10px',
            padding: '10px',
            border: '1px solid #ccc',
            cursor: 'move',
          }}
        >
          Radio Button
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
