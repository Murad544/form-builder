// slices/formBuilderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormBuilderState {
  formFields: Field[];
  selectedField: Field | null;
}

export interface Field {
  name: string;
  accessor: string;
  label?: string;
  placeholder?: string;
  width?: string;
  visibility?: string;
  minLength?: number;
  maxLength?: number;
  helperText?: string;
  required?: boolean;
  options?: string[];
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
  },
});

export const { addFormField, selectField, deleteFormField } =
  formBuilderSlice.actions;

export default formBuilderSlice.reducer;
