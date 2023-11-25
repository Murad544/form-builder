// slices/formBuilderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InputProps {
  name: string;
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

interface FormBuilderState {
  formFields: InputProps[];
  selectedField: InputProps | null;
}

const initialState: FormBuilderState = {
  formFields: [],
  selectedField: null,
};

const formBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    addFormField: (state, action: PayloadAction<InputProps>) => {
      state.formFields = [...state.formFields, action.payload];
    },
    selectField: (state, action: PayloadAction<InputProps | null>) => {
      state.selectedField = action.payload;
    },
  },
});

export const { addFormField, selectField } = formBuilderSlice.actions;

export default formBuilderSlice.reducer;
