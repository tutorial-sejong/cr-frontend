import { baseAPI } from '../utils/instance';

interface LoginCredentials {
  studentId: string;
  password: string;
}
interface LoginResponse {
  accessToken: string;
  username: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const { data } = await baseAPI.post<LoginResponse>('/api/auth/login', credentials);
    return data;
  } catch (error) {
    console.log('Login failed: ', error);
    throw error;
  }
};

export const refreshAccessToken = async (): Promise<string> => {
  try {
    const { data } = await baseAPI.post<{ accessToken: string }>('/api/auth/refresh');
    return data.accessToken;
  } catch (error) {
    console.log('Failed to refresh access token: ', error);
    throw error;
  }
};
