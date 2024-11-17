import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';

export interface School {
  id: string;
  name: string;
  level: string;
  principal: string;
  studentsCount: number;
}

interface SchoolsState {
  schools: School[];
  loading: boolean;
  error: string | null;
}

const initialState: SchoolsState = {
  schools: [],
  loading: false,
  error: null,
};

export const fetchSchools = createAsyncThunk(
  'schools/fetchSchools',
  async (filters: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/schools`, { params: filters });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteSchool = createAsyncThunk(
  'schools/deleteSchool',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/schools/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const schoolsSlice = createSlice({
  name: 'schools',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchools.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchools.fulfilled, (state, action) => {
        state.loading = false;
        state.schools = action.payload;
      })
      .addCase(fetchSchools.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteSchool.fulfilled, (state, action) => {
        state.schools = state.schools.filter((school) => school.id !== action.payload);
      })
      .addCase(deleteSchool.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default schoolsSlice.reducer;
