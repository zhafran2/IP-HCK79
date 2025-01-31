import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../AXIOS/axiosinstance";

export const fetchQuiz = createAsyncThunk("/", async (_, thunkAPI) => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "/quiz",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    console.log(data, "AAAAA");
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    //   .addCase(fetchQuiz.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchQuiz.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.questions = action.payload;
    //   });
     
  },
});

export default quizSlice.reducer