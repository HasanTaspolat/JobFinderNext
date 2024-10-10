import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/register";

export interface RegisterUserResponse {
  user: {
    id: string;
    email: string;
    profileImage: string;
  };
  tokenType: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterUserParams {
  email: string;
  password: string;
}

export const registerUser = async (params: RegisterUserParams): Promise<RegisterUserResponse> => {
  try {
    const response = await axios.post<RegisterUserResponse>(API_URL, params, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred while registering the user.");
  }
};
