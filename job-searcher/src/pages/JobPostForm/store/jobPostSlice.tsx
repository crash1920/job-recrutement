import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { IFeaturedJobs } from '../../../models/home.interfaces';

interface JobPostState {
  featuredJobs: IFeaturedJobs[];
  isLoading: boolean;
  error: string | null;
}

const initialState: JobPostState = {
  featuredJobs: [],
  isLoading: false,
  error: null,
};

export const postJob = createAsyncThunk(
  'jobPost/postJob',
  async (formData: IFeaturedJobs, thunkAPI) => {
    const user = localStorage.getItem('token');
    const token = user ? JSON.parse(user).token : null;
    if (!token) {
      throw new Error('Bearer token not found');
    }

    const response = await fetch(`${apis.featuredJobs}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  },
);

const jobPostSlice = createSlice({
  name: 'jobPost',
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
    builder.addCase(postJob.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(postJob.fulfilled, (state, action) => {
      state.featuredJobs.push(action.payload);
      state.isLoading = false;
      state.error = null;
    })
      .addCase(postJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
  },
});

export const { setLoading, fetchError } = jobPostSlice.actions;

export default jobPostSlice.reducer;
