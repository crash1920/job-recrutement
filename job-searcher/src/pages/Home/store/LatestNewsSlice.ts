import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { INews } from '../../../models/home.interfaces';

interface LatestNewsState {
  news: INews[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: LatestNewsState = {
  news: null,
  isLoading: false,
  error: null,
};
export const fetchLatestNews = createAsyncThunk(
  'latestNews',
  async (thunkAPI) => {
    const response = await fetch(apis.news, {
      method: 'GET',
    });
    return response.json();
  },
);

const LatestNewsSlice = createSlice({
  name: 'latestNews',
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
    builder.addCase(fetchLatestNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.isLoading = false;
    })
      .addCase(fetchLatestNews.pending, (state) => {
        state.isLoading = true;
        state.news = null;
        state.error = null;
      });
  },
});

export const { setLoading, fetchError } = LatestNewsSlice.actions;

export default LatestNewsSlice.reducer;
