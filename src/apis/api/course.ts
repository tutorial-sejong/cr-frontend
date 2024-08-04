import {CourseTypes} from '@/assets/types/tableType';
import {baseAPI} from '../utils/instance';

export const getCourseList = async (filter: object) => {
  const queryParams = new URLSearchParams();

  Object.entries(filter).forEach(([key, value]) => {
    if (value && value.length !== 0 && !value.includes('-')) {
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

export const saveWishlist = async (
  studentId: string,
  wishListIdList: number[],
) => {
  try {
    const {data} = await baseAPI.post('/wishlist/save', {
      studentId,
      wishListIdList,
    });
    return data;
  } catch (error) {
    console.error('Save wishlist fail: ', error);
    throw error;
  }
};

export const getWishlist = async (
  studentId: string,
): Promise<CourseTypes[]> => {
  try {
    const {data} = await baseAPI.get(`/wishlist?studentId=${studentId}`);
    return data;
  } catch (error) {
    console.error('Get wishlist fail: ', error);
    throw error;
  }
};

export const deleteWishlistItem = async (
  studentId: string,
  scheduleId: number,
) => {
  try {
    const {data} = await baseAPI.delete(
      `/wishlist?studentId=${studentId}&scheduleId=${scheduleId}`,
    );
    return data;
  } catch (error) {
    console.error('Delete wishlist item fail: ', error);
    throw error;
  }
};

export const getRegisterdList = async () => {
  try {
    const {data} = await baseAPI.get('/registrations');
    return data;
  } catch (error) {
    console.error('get registerd List fail: ', error);
  }
};

export const postCourse = async (id: number) => {
  try {
    const {data} = await baseAPI.post(`/registrations/${id}`);
    return data;
  } catch (error) {
    console.error('post course fail: ', error);
    return error;
  }
};

export const deleteCourse = async (id: number) => {
  try {
    const {data} = await baseAPI.delete(`/registrations/${id}`);
    return data;
  } catch (error) {
    console.error('delete course fail: ', error);
  }
};

export const deleteAllRegistrations = async () => {
  try {
    const {data} = await baseAPI.delete('/registrations/all');
    return data;
  } catch (error) {
    console.error('모든 수강신청 내역 삭제 실패: ', error);
  }
};

export const getMacroCode = async () => {
  try {
    const {data} = await baseAPI.get('/api/auth/macro');
    return data;
  } catch (error) {
    console.error('Get macro code fail', error);
    throw error;
  }
};
