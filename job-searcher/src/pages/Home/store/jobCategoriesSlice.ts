import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { ICategory } from '../../../models/home.interfaces';

interface JobCategoriesState {
  categories: ICategory[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobCategoriesState = {
  categories: null,
  isLoading: false,
  error: null,
};
export const fetchJobCategories = createAsyncThunk(
  'jobCategories',
  async (thunkAPI) => {
    const response = await fetch(apis.categories, {
      method: 'GET',
    });
    return response.json();
  },
);

const jobCategoriesSlice = createSlice({
  name: 'jobCategories',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },

    fetchError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    })
      .addCase(fetchJobCategories.pending, (state) => {
        state.isLoading = true;
        state.categories = null;
        state.error = null;
      });
  },
});

export const { setLoading, fetchError } = jobCategoriesSlice.actions;

export default jobCategoriesSlice.reducer;
