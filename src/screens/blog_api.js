import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import ApiManager from '../ApiManager/ApiManager';

export const blog_api = async data => {
  try {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    // dataToken != null ? JSON.stringify(dataToken) : '';
    // console.log(dataToken);
    const result = ApiManager('/blogs', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        Authorization: 'Bearer ' + dataToken,
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const blog_detail = async (data) => {
  try {
    const dataToken = await AsyncStorage.getItem('AccessToken');
    const detail = ApiManager(`/blogs/show/${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        Authorization: 'Bearer ' + dataToken,
      },
      data: data,
    });
    return detail;
  } catch (error) {
    console.error(error);
  }
};
