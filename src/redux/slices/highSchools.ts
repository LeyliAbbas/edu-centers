import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';

export interface HighSchool {
  id: string;
  name: string;
  region: string;
  yearEstablished: number;
  principal: string;
  graduationRate: number;
}

interface HighSchoolsState {
  highSchools: HighSchool[];
  loading: boolean;
  error: string | null;
}

const initialState: HighSchoolsState = {
  highSchools: [],
  loading: false,
  error: null,
};

export const fetchHighSchools = createAsyncThunk(
  'highSchools/fetchHighSchools',
  async (filters: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/highSchools`, { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteHighSchool = createAsyncThunk(
  'highSchools/deleteHighSchool',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/highSchools/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const highSchoolsSlice = createSlice({
  name: 'highSchools',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHighSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.highSchools = action.payload;
      })
      .addCase(fetchHighSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteHighSchool.fulfilled, (state, action) => {
        state.highSchools = state.highSchools.filter((school) => school.id !== action.payload);
      })
      .addCase(deleteHighSchool.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default highSchoolsSlice.reducer;
