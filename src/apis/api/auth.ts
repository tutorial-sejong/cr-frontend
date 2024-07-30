import { baseAPI } from '../utils/instance';

interface LoginCredentials {
  studentId: string;
  password: string;
}

export const login = async (credentials: LoginCredentials) => {
  try {
    const { data } = await baseAPI.post('/api/auth/login', credentials);
    return data;
  } catch (error) {
    console.log('Login failed: ', error);
    throw error;
  }
};
