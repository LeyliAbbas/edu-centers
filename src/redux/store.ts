import { configureStore } from '@reduxjs/toolkit';
import universitiesReducer from './slices/universities';
import schoolsReducer from './slices/schools';
import highSchoolsReducer from './slices/highSchools';

const store = configureStore({
  reducer: {
    universities: universitiesReducer,
    schools: schoolsReducer,
    highSchools: highSchoolsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
