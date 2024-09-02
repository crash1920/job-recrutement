import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { ICandidates } from '../../../models/candidates.interfaces';

interface CandidatesState {
  candidates: ICandidates[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CandidatesState = {
  candidates: null,
  isLoading: false,
  error: null,
};
export const fetchCandidates = createAsyncThunk(
  'candidates',
  async (_, thunkAPI) => {
    const user = localStorage.getItem('token');
    const token = user ? JSON.parse(user).token : null;
    if (!token) {
      throw new Error('Bearer token not found');
    }

    const response = await fetch(apis.candidates, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
);

const candidatesSlice = createSlice({
  name: 'candidates',
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
    builder.addCase(fetchCandidates.fulfilled, (state, action) => {
      state.candidates = action.payload;
      state.isLoading = false;
    })
      .addCase(fetchCandidates.pending, (state) => {
        state.isLoading = true;
        state.candidates = null;
        state.error = null;
      });
  },
});
export const { setLoading, fetchError } = candidatesSlice.actions;

export default candidatesSlice.reducer;
