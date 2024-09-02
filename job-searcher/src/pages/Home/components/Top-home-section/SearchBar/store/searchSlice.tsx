import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFeaturedJobs } from '../../../../../../models/home.interfaces';
import apis from '../../../../../../api/api';

interface SearchState {
  filteredJobs: IFeaturedJobs[] | null;
  isLoading: boolean;
  error: string | null;
}

interface FetchFilteredJobsParams {
  countryFilter?: string | null;
  searchTerm?: string | null;
  jobCategoryFilter?: string | null;
}

const initialState: SearchState = {
  filteredJobs: null,
  isLoading: false,
  error: null,
};

export const fetchFilteredJobs = createAsyncThunk(
  'search/fetchFilteredJobs',
  async ({ countryFilter, searchTerm, jobCategoryFilter }: FetchFilteredJobsParams, thunkAPI) => {
    const url = `${apis.featuredJobs}?country=${countryFilter}&searchTerm=${searchTerm}&jobCategory=${jobCategoryFilter}`;
    const response = await fetch(url, {
      method: 'GET',
    });
    return response.json();
  },
);

const searchSlice = createSlice({
  name: 'search',
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
    builder
      .addCase(fetchFilteredJobs.pending, (state) => {
        state.isLoading = true;
        state.filteredJobs = null;
        state.error = null;
      })
      .addCase(fetchFilteredJobs.fulfilled, (state, action) => {
        state.filteredJobs = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilteredJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch filtered jobs';
      });
  },
});

export const { setLoading, fetchError } = searchSlice.actions;

export default searchSlice.reducer;
