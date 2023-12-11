import { ExtensionProps } from '@/types';
import { useState, useCallback } from 'react';

interface ElementData {
  id: number;
  name?: string;
  type?: string;
  accessor?: string;
  props: ExtensionProps;
}

const useFormBuilder = () => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [selectedElement, setSelectedElement] = useState<ElementData | null>(
    null,
  );

  // Function to add a new element
  const addElement = useCallback(
    (accessor: string, initialProps: ExtensionProps) => {
      const newElement: ElementData = {
        id: Date.now(), // Simple unique id generator
        accessor,
        name: accessor,
        props: initialProps,
      };
      setSelectedElement(newElement);
      setElements((prevElements) => [...prevElements, newElement]);
    },
    [],
  );

  // Function to remove an element
  const removeElement = useCallback((id: number) => {
    setElements((prevElements) =>
      prevElements.filter((element) => element.id !== id),
    );
  }, []);

  // Function to update an element's properties
  const updateElementProps = useCallback(
    (id: number, newProps: ExtensionProps) => {
      setElements((prevElements) =>
        prevElements.map((element) => {
          if (element.id === id) {
            return { ...element, props: { ...element.props, ...newProps } };
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
      const elementProps = elements.find((element) => element.id === id)?.props;
      if (elementProps) {
        elementProps[key] = value;
      }
      setElements((prevElements) =>
        prevElements.map((element) => {
          if (element.id === id) {
            return { ...element, props: { ...element.props, ...elementProps } };
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
    setSelectedElement,
    handlePropsChange,
  };
};

export default useFormBuilder;
