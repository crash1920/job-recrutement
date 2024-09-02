import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import apis from '../../../api/api';
import { IUsers } from '../../../models/users.interfaces';

interface UsersState {
  users: IUsers[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'users/createUser',
  async (formData: IUsers) => {
    const {
      firstName,
      lastName,
      username,
      email,
      password,
      confirmPassword,
      birthday,
      mobileNumber,
      resume,
      role,
    } = formData;
    const response = await fetch(`${apis.users}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        birthday,
        username,
        email,
        password,
        confirmPassword,
        mobileNumber,
        resume,
        role,
      }),
    }); if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    return response.json();
  },
);

const SignUpSlice = createSlice({
  name: 'users',
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
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
      state.isLoading = false;
      state.error = null;
    })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error?.message || null;
      });
  },
});

export const { setLoading, fetchError } = SignUpSlice.actions;

export default SignUpSlice.reducer;
