import { Extension, ExtensionSettings } from '@/types';
import { useState, useCallback } from 'react';

const useFormBuilder = () => {
  const [elements, setElements] = useState<Extension[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<number | null>(
    null,
  );
  const selectedElement = elements.find(
    (element) => element.id === selectedElementId,
  );

  // Function to add a new element
  const addElement = useCallback((slug: any) => {
    const newElement: Extension = {
      id: Date.now(), // Simple unique id generator
      ...slug,
    };
    setSelectedElementId(newElement.id);
    setElements((prevElements) => [...prevElements, newElement]);
  }, []);

  // Function to remove an element
  const removeElement = useCallback((id: number) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id),
    );
  }, []);

  // Function to update an element's properties
  const updateElementProps = useCallback(
    (id: number, newProps: ExtensionSettings) => {
      setElements((prevElements) =>
        prevElements.map((element) => {
          if (element.id === id) {
            return {
              ...element,
              settings: { ...element.settings, ...newProps },
            };
          }
          return element;
        }),
      );
    },
    [],
  );

  // Function to reorder elements
  const reorderElements = useCallback(
    (startIndex: number, endIndex: number) => {
      const dragItem = elements[startIndex];
      const newFormFields = [...elements];
      newFormFields.splice(startIndex, 1);
      newFormFields.splice(endIndex, 0, dragItem);
      setElements(newFormFields);
    },
    [elements],
  );

  const handlePropsChange = useCallback(
    (id: number, key: string, value: any) => {
      const elementProps = elements.find(
        (element) => element.id === id,
      )?.settings;
      if (elementProps) {
        elementProps[key] = value;
      }
      setElements((prevElements) =>
        prevElements.map((element) => {
          if (element.id === id) {
            return {
              ...element,
              settings: { ...element.settings, ...elementProps },
            };
          }
          return element;
        }),
      );
    },
    [elements],
  );

  return {
    elements,
    addElement,
    removeElement,
    updateElementProps,
    reorderElements,
    selectedElement,
    setSelectedElementId,
    handlePropsChange,
  };
};

export default useFormBuilder;
