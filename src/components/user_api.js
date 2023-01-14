import ApiManager from '../ApiManager/ApiManager';

export const user_login = async data => {
  try {
    const result = await ApiManager('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error.data;
  }
};
