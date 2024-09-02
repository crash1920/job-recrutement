/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { ICandidates } from '../../../models/candidates.interfaces';

interface CandidateDetailsState {
  candidate: ICandidates | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CandidateDetailsState = {
  candidate: null,
  isLoading: false,
  error: null,
};

export const fetchCandidateById = createAsyncThunk(
  'candidateDetails/fetchById',
  async (id?: string) => {
    const user = localStorage.getItem('token');
    const token = user ? JSON.parse(user).token : null;
    if (!token) {
      throw new Error('Bearer token not found');
    }
    const response = await fetch(`${apis.candidates}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
);

const CandidateDetailsSlice = createSlice({
  name: 'candidateDetails',
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
    builder.addCase(fetchCandidateById.fulfilled, (state, action) => {
      state.candidate = action.payload;
      state.isLoading = false;
    })
      .addCase(fetchCandidateById.pending, (state) => {
        state.isLoading = true;
        state.candidate = null;
        state.error = null;
      });
  },
});

export const { setLoading, fetchError } = CandidateDetailsSlice.actions;

export default CandidateDetailsSlice.reducer;
