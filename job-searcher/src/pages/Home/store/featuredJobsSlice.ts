import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { IFeaturedJobs } from '../../../models/home.interfaces';

interface IFeaturedJobsState {
  featuredJobs: IFeaturedJobs[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IFeaturedJobsState = {
  featuredJobs: null,
  isLoading: false,
  error: null,
};
export const fetchFeaturedJobs = createAsyncThunk(
  'featuredJobs',
  async (thunkAPI) => {
    const response = await fetch(apis.featuredJobs, {
      method: 'GET',
    });
    return response.json();
  },
);

const featuredJobsSlice = createSlice({
  name: 'featuredJobs',
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
    builder.addCase(fetchFeaturedJobs.fulfilled, (state, action) => {
      state.featuredJobs = action.payload;
      state.isLoading = false;
    })
      .addCase(fetchFeaturedJobs.pending, (state) => {
        state.isLoading = true;
        state.featuredJobs = null;
        state.error = null;
      });
  },
});

export const { setLoading, fetchError } = featuredJobsSlice.actions;

export default featuredJobsSlice.reducer;
