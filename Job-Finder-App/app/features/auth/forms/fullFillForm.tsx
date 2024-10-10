'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import userProfileSchema from '@/app/features/auth/schemas/fulfillSchema';
import updateUserProfile from '@/app/services/user/updateUserProfile';
import  useAuthStore  from '@/app/stores/useAuthStore';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/atoms/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/molecules/form';
import { Input } from '@/app/components/atoms/input';
import { z } from 'zod';

type UserProfileFormValues = z.infer<typeof userProfileSchema>;

const UserProfileForm = () => {
  const { accessToken } = useAuthStore((state) => state);
  const { user } = useAuthStore((state) => state);
  const setUser = useAuthStore((state) => state.setUser);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: user || {
      id: '',
      name: '',
      surname: '',
      phone: '',
      profileImage: '',
      dateOfBirth: '',
      address: {
        details: '',
        city: '',
        country: '',
      },
    },
  });

  const onSubmit = async (values: UserProfileFormValues) => {
    setServerError(null);
    console.log(user)

    try {
      const updatedUser = await updateUserProfile(values, String(accessToken));
      setUser(updatedUser);
      router.push('/list');
    } catch (error: any) {
      console.error('Profile update error:', error.message);
      setServerError(error.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {serverError && <p className="text-red-500">{serverError}</p>}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Your surname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Profile image URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <Input type="date" placeholder="Date of birth" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address Details</FormLabel>
              <FormControl>
                <Input placeholder="Address details" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address.country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Update Profile</Button>
      </form>
    </Form>
  );
};

export default UserProfileForm;
