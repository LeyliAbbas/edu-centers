import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/const';

export interface University {
  id: string;
  name: string;
  year: number;
  region: string;
  corpus: string[];
}

interface UniversitiesState {
  universities: University[];
  loading: boolean;
  error: string | null;
}

const initialState: UniversitiesState = {
  universities: [],
  loading: false,
  error: null,
};

export const fetchUniversities = createAsyncThunk(
  'universities/fetchUniversities',
  async (filters: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/universities`, {
        params: filters,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUniversity = createAsyncThunk(
  'universities/deleteUniversity',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/universities/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const universitiesSlice = createSlice({
  name: 'universities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.loading = false;
        state.universities = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUniversity.fulfilled, (state, action) => {
        state.universities = state.universities.filter(
          (university) => university.id !== action.payload
        );
      })
      .addCase(deleteUniversity.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default universitiesSlice.reducer;
