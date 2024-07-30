import {baseAPI} from '../utils/instance';

export const getCourseList = async (filter: object) => {
  const queryParams = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (value && value.length !== 0) {
      queryParams.append(key, value.toString());
    }
  });

  try {
    const {data} = await baseAPI.get(
      `/schedules/search?${queryParams.toString()}`,
    );
    return data;
  } catch (error) {
    console.log('get course list fail: ', error);
  }
};
