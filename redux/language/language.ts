import { createSlice } from '@reduxjs/toolkit';

import { Languages } from '@/constants/enums';

export const language = createSlice({
  name: 'language',
  initialState: { language: Languages.russian },
  reducers: {
    changeLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = language.actions;
export default language.reducer;
