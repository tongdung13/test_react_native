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
        Authorization: 'Bearer ' + dataToken,
      },
      data: data,
    });
    return result;
  } catch (error) {
    console.error(error);
  }
};
