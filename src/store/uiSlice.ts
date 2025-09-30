import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Ui {
  drawerOpen: boolean;
}

const initialState: Ui = {
  drawerOpen: false,
}

const uiSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setDrawer(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.drawerOpen = action.payload.isOpen;
    },
  }

});

export const { setDrawer } = uiSlice.actions;
export default uiSlice.reducer;