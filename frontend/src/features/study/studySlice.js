import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import studyService from "./studyService";

const initialState = {
  study: null,
  studyData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAddModalOpen: false,
  message: "",
  daysBack: 7,
};

export const createStudyEntry = createAsyncThunk(
  "study/createStudyEntry",
  async (studyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await studyService.createStudyEntry(studyData,token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStudyEntries = createAsyncThunk(
  "study/getStudyEntries",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const daysBack = thunkAPI.getState().study.daysBack;
      return await studyService.getStudyEntries(token, daysBack);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studySlice = createSlice({
  name: "study",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    toggleModal: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    setDaysBack: (state, action) => {
      state.daysBack = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStudyEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStudyEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAddModalOpen = false;
        state.studyData.push(action.payload);
      })
      .addCase(createStudyEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStudyEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStudyEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.studyData = action.payload;
      })
      .addCase(getStudyEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.studyData = null;
      });
  },
});

export const { reset, setAppointment, toggleModal, setDaysBack } = studySlice.actions;
export default studySlice.reducer;
