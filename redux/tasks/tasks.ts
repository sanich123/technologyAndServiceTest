import { createSlice } from '@reduxjs/toolkit';

export const tasks = createSlice({
  name: 'task',
  initialState: { currentName: '', currentDescription: '', tasks: [] },
  reducers: {
    saveName: (state, action) => {
      state.currentName = action.payload;
    },
    saveDescription: (state, action) => {
      state.currentDescription = action.payload;
    },
    saveTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { saveName, saveDescription, saveTasks } = tasks.actions;
export default tasks.reducer;
