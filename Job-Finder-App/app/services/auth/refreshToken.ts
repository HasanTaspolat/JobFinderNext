import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/refresh";

interface RefreshTokenResponse {
  accessToken: string;
}

const refreshTokenRequest = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  try {
    const response = await axios.post<RefreshTokenResponse>(API_URL, { refreshToken: refreshToken }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "An error occurred while refreshing the token.");
  }
};

export default refreshTokenRequest;
