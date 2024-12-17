import { configureStore } from '@reduxjs/toolkit';
import studentReducer from '@/modules/store/studentSlice';

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

// Only store-specific types belong here
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;