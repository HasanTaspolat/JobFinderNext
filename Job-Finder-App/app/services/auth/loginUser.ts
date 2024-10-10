import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/login";

interface LoginUserResponse {
  user: {
    id: string;
    email: string;
    profileImage: string;
  };
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

interface LoginUserParams {
  email: string;
  password: string;
}

const loginUser = async (params: LoginUserParams): Promise<LoginUserResponse> => {
  try {
    const response = await axios.post<LoginUserResponse>(API_URL, params, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Invalid Credentials, please check your Email and Password");
  }
};

export default loginUser;
