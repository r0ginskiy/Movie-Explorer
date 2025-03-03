import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthState, Filters, UserAccount, UserLogin } from "../../utils/types";
import authService from "./authService";

export const loginUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (credentials: UserLogin, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserByIdAsync = createAsyncThunk(
  "auth/getUserById",
  async (email: string, thunkAPI) => {
    try {
      const response = await authService.getUserById(email);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signUpAsync = createAsyncThunk(
  "auth/signUp",
  async (credentials: UserAccount, thunkAPI) => {
    try {
      const response = await authService.signUp(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllMetadataAsync = createAsyncThunk(
  "auth/getAllMetadata",
  async (token: string | null, thunkAPI) => {
    try {
      const response = await authService.getAllMetadata(token);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getFilteredFilmesAsync = createAsyncThunk(
  "auth/getFilteredFilmes",
  async (
    {
      token,
      filters,
    }: {
      token: string | null;
      filters?: Filters;
    },
    thunkAPI
  ) => {
    try {
      const response = await authService.getFilteredFilmes(token, filters);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: AuthState = {
  status: "idle",
  userAccount: null,
  token: null,
  movies: null,
  metadata: null,
  paginationRequestPage: { page: 1 },
  error: null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPaginationRequestPage: (state, action) => {
      state.paginationRequestPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })

      .addCase(getUserByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAccount = action.payload;
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })

      .addCase(signUpAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userAccount = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })

      .addCase(getAllMetadataAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllMetadataAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.metadata = action.payload;
      })
      .addCase(getAllMetadataAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      })

      .addCase(getFilteredFilmesAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getFilteredFilmesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload;
      })
      .addCase(getFilteredFilmesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as any;
      });
  },
});

export const { setPaginationRequestPage } = userSlice.actions;

export default userSlice.reducer;
