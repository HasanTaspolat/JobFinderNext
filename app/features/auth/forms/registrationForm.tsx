'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import registerFormSchema from '../schemas/registerSchema';
import { Button } from '@/app/components/atoms/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/components/molecules/form';
import { Input } from '@/app/components/atoms/input';
import { registerUser } from "../../../services/auth/registerUser"
import fetchUser from '@/app/services/user/fetchUser';
import { setAuthData } from '@/app/utils/AuthActions';
import Spinner from '@/app/components/atoms/spinner';
import useAuthStore from '@/app/stores/useAuthStore';

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegistrationForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state: { setUser: any; }) => state.setUser);
  const router = useRouter();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setServerError(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const data = await registerUser(values);
      setAuthData(data.user, data.accessToken, data.refreshToken);

      const userData = await fetchUser(data.accessToken);
      setUser(userData);

      setSuccessMessage('User registered successfully!');

      if (!userData.name || !userData.surname || !userData.phone || !userData.address || !userData.profileImage) {
        localStorage.clear();
        router.push('/fullfill-profile');

      } else {
        localStorage.clear();
        router.push('/list');
      }
    } catch (error: any) {
      console.error('Registration error:', error.message);
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {serverError && <p className="text-red-500">{serverError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Your email" {...field} />
              </FormControl>
              <FormDescription>This is your public email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your strong password" {...field} />
              </FormControl>
              <FormDescription>
                Your password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
              <span className="ml-2">Registering...</span>
            </div>
          ) : (
            'Register'
          )}
        </Button>
        {form.formState.errors && (
          <div className="text-red-500">
            {form.formState.errors.email?.message || form.formState.errors.password?.message}
          </div>
        )}
      </form>
    </Form>
  );
}
