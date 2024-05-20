/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNews, searchedNews, fetchCategories } from '../api/getNews';

const initialState = {
  news: [],
  searchedNews: [],
  categories: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const fetchNews = createAsyncThunk('news/getNews', async ({ category, country, accessToken }) => {
  return await getNews(accessToken, category, country);
});

export const fetchSearchedNews = createAsyncThunk('news/searchedNews', async ({ query, category, accessToken }) => {
  const response = await searchedNews(accessToken, query, category);
  return response;
});

export const fetchNewsCategories = createAsyncThunk('news/fetchCategories', async (accessToken) => {
  return await fetchCategories(accessToken);
});

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchSearchedNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSearchedNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchedNews = action.payload.articles;
      })
      .addCase(fetchSearchedNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(fetchNewsCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewsCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload;
      })
      .addCase(fetchNewsCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export const selectNews = (state) => state.news.news;
export const selectSearchedNews = (state) => state.news.searchedNews;
export const selectCategories = (state) => state.news.categories;
export const selectIsLoading = (state) => state.news.isLoading;
export const selectIsError = (state) => state.news.isError;
export const selectErrorMessage = (state) => state.news.errorMessage;

export default newsSlice.reducer;