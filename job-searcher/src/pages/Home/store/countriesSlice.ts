import {
  createAsyncThunk, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { ICountry } from '../../../models/home.interfaces';

interface CountriesState {
  countries: ICountry[] | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: null,
  isLoading: false,
  error: null,
};
export const fetchCountries = createAsyncThunk(
  'countries',
  async (thunkAPI) => {
    const response = await fetch(apis.countries, {
      method: 'GET',
    });
    return response.json();
  },
);

const countriesSlice = createSlice({
  name: 'countries',
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
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setLoading, fetchError } = countriesSlice.actions;

export default countriesSlice.reducer;
