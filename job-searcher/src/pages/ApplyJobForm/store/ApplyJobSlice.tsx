import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { ICandidates } from '../../../models/candidates.interfaces';

interface ApplyJobState {
  candidates: ICandidates[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ApplyJobState = {
  candidates: [],
  isLoading: false,
  error: null,
};
export const applyJob = createAsyncThunk(
  'applyJob/applyJob',
  async (formData: ICandidates, thunkAPI) => {
    const user = localStorage.getItem('token');
    const token = user ? JSON.parse(user).token : null;
    if (!token) {
      throw new Error('Bearer token not found');
    }

    const response = await fetch(`${apis.candidates}`, {
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

const applyJobSlice = createSlice({
  name: 'applyJob',
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
    builder.addCase(applyJob.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(applyJob.fulfilled, (state, action) => {
      state.candidates.push(action.payload);
      state.isLoading = false;
      state.error = null;
    })
      .addCase(applyJob.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
  },
});

export const { setLoading, fetchError } = applyJobSlice.actions;

export default applyJobSlice.reducer;
