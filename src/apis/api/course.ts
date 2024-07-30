import {baseAPI} from '../utils/instance';

export const getCourseList = async (filter: object) => {
  let query = '/schedules/search?';

  Object.entries(filter).forEach(item => {
    if (!item[1].includes('-') && item[1].length !== 0) {
      query += `${item[0]}=${item[1]}&`;
    }
  });

  try {
    const {data} = await baseAPI.get(query);
    return data;
  } catch (error) {
    console.log('get course list fail: ', error);
  }
};
