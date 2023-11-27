'use client';

import { editFormField } from '@/store/slices/formBuilderSlice';
import { RootState } from '@/store/store';
import { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Choices = () => {
  const dispatch = useDispatch();
  const selectedField = useSelector(
    (state: RootState) => state.formBuilder.selectedField,
  );

  const choices = selectedField?.choices ?? [];
  const handleAddChoice = () => {
    selectedField &&
      dispatch(
        editFormField({
          ...selectedField,
          choices: [...(selectedField.choices ?? []), ''],
        }),
      );
  };

  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const index = Number(e.target.name);
    const newChoices = [...choices];
    newChoices[index] = value;
    selectedField &&
      dispatch(
        editFormField({
          ...selectedField,
          choices: newChoices,
        }),
      );
  };

  const handleDeleteChoice = (index: number) => {
    const newChoices = [...choices];
    newChoices.splice(index, 1);
    selectedField &&
      dispatch(
        editFormField({
          ...selectedField,
          choices: newChoices,
        }),
      );
  };
  return (
    <div>
      <h3 className='text-xl font-semibold mb-2'>Choices</h3>
      <ul className='grid gap-2'>
        {choices.map((choice, index) => (
          <li key={index} className='grid grid-cols-5 gap-8'>
            <input
              type='text'
              className='border border-gray-300 col-span-4'
              name={`${index}`}
              onChange={handleOptionChange}
              value={choice ?? ''}
            />
            <button
              className='bg-red-500 text-white rounded-full hover:bg-red-600 w-6 h-6'
              onClick={() => handleDeleteChoice(index)}
            >
              x
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddChoice}>Add Choice</button>
    </div>
  );
};

export default Choices;
