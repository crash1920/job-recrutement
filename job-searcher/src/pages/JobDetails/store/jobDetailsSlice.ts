import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { IFeaturedJobs } from '../../../models/home.interfaces';

interface JobDetailsState {
  job: IFeaturedJobs | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: JobDetailsState = {
  job: null,
  isLoading: false,
  error: null,
};

export const fetchJobById = createAsyncThunk(
  'jobDetails/fetchById',
  async (id?: string) => {
    const response = await fetch(`${apis.featuredJobs}/${id}`, {
      method: 'GET',
    });
    return response.json();
  },
);

const JobDetailsSlice = createSlice({
  name: 'jobDetails',
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
    builder.addCase(fetchJobById.fulfilled, (state, action) => {
      state.job = action.payload;
      state.isLoading = false;
    })
      .addCase(fetchJobById.pending, (state) => {
        state.isLoading = true;
        state.job = null;
        state.error = null;
      });
  },
});

export const { setLoading, fetchError } = JobDetailsSlice.actions;

export default JobDetailsSlice.reducer;
