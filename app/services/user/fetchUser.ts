import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/user";

interface FetchUserResponse {
  id: string;
  email: string;
  name: string;
  surname: string;
  phone: string;
  profileImage: string;
  dateOfBirth: string;
  address: {
    details: string;
    city: string;
    country: string;
  };
}

const fetchUser = async (accessToken: string): Promise<FetchUserResponse> => {
  try {
    const response = await axios.get<FetchUserResponse>(API_URL, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'accept': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user data.");
  }
};

export default fetchUser;
