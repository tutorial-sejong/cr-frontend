import {baseAPI} from '../utils/instance';

export const getCourseList = async (body: object) => {
  try {
    const {data} = await baseAPI.get('/schedules/search', body);
    return data;
  } catch (error) {
    console.log('get course list fail: ', error);
  }
};
