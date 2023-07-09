import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export const SET = "SET";

export interface NotificationsState {
  amount: number;
}

const initialState: NotificationsState = {
  amount: 0,
};

export const notificationsStateSlice = createSlice({
  name: "notificationsStateSlice",
  initialState,
  reducers: {
    setChatNotification: (state, action: PayloadAction<number>) => {
      state.amount = action.payload;
    },
  },
});

export const { setChatNotification } = notificationsStateSlice.actions;
export default notificationsStateSlice.reducer;
