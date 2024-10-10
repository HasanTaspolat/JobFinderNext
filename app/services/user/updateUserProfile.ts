import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/user";

interface UserProfile {
  id: string;
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

const updateUserProfile = async (userProfile: UserProfile, accessToken: string) => {
  try {
    const response = await axios.put(API_URL, userProfile, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error updating user profile:', error.response?.data || error.message);
    throw error;
  }
};

export default updateUserProfile;
