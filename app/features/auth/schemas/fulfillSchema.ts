import { z } from 'zod';

const addressSchema = z.object({
  details: z.string().nonempty('Details are required'),
  city: z.string().nonempty('City is required'),
  country: z.string().nonempty('Country is required'),
});

const userProfileSchema = z.object({
  id: z.string(),
  name: z.string().nonempty('Name is required'),
  surname: z.string().nonempty('Surname is required'),
  phone: z.string().nonempty('Phone is required'),
  profileImage: z.string().url('Must be a valid URL').nonempty('Profile image URL is required'),
  dateOfBirth: z.string().nonempty('Date of birth is required'),
  address: addressSchema,
});

export default userProfileSchema;
