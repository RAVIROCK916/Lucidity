import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  isAdmin: true,
}

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeCredentials: (state) => {
      state.isAdmin = !state.isAdmin
    }
  }
})

export const { changeCredentials } = adminSlice.actions

export default adminSlice.reducer