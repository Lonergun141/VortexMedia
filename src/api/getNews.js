/* eslint-disable no-unused-vars */
import axios from 'axios';

const API_BASE_URL = 'http://192.168.1.2:8000/api/news';

export const getNews = async (accessToken, category, country) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.get(`${API_BASE_URL}/topheadlines/?category=${category}&country=${country}`, config);
  return response.data;
};

export const searchedNews = async (accessToken, query, category) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const response = await axios.get(`${API_BASE_URL}/everything/?q=${query}&${category}`, config);
  return response.data;
};

export const fetchCategories = async (accessToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  try {
    const response = await axios.get(`${API_BASE_URL}/sources`, config, { params: { language: 'en' } });
    const sources = response.data.sources || [];
    const categories = [...new Set(sources.map((source) => source.category))];
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};