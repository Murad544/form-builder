// slices/formBuilderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormBuilderState {
  formFields: Field[];
  selectedField: Field | null;
}

export interface Field {
  id: string;
  name: string;
  slug: string;
  label?: string;
  placeholder?: string;
  width?: string;
  visibility?: 'visible' | 'hidden';
  minLength?: number;
  maxLength?: number;
  helperText?: string;
  required?: boolean;
  choices?: string[];
}

const initialState: FormBuilderState = {
  formFields: [],
  selectedField: null,
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addFormField: (state, action: PayloadAction<Field>) => {
      state.formFields = [...state.formFields, action.payload];
      state.selectedField = action.payload;
    },
    selectField: (state, action: PayloadAction<Field | null>) => {
      state.selectedField = action.payload;
    },
    deleteFormField: (state, action: PayloadAction<number>) => {
      state.formFields = state.formFields.filter(
        (field, index) => index !== action.payload,
      );
      state.selectedField = null; // Clear the selected field after deleting
    },
    editFormField: (state, action: PayloadAction<Field>) => {
      state.formFields = state.formFields.map((field) =>
        field.id === action.payload.id ? action.payload : field,
      );
      state.selectedField = action.payload;
    },
  },
});

export const { addFormField, selectField, deleteFormField, editFormField } =
  formBuilderSlice.actions;

export default formBuilderSlice.reducer;
