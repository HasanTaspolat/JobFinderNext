'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import loginFormSchema from '../schemas/loginSchema';
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
import loginUser from '@/app/services/auth/loginUser';
import fetchUser from '@/app/services/user/fetchUser';
import { setAuthData } from '@/app/utils/AuthActions';
import Spinner from '@/app/components/atoms/spinner';
import  useAuthStore from '@/app/stores/useAuthStore';

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    setIsLoading(true);

    try {
      const data = await loginUser(values);
      setAuthData(data.user, data.accessToken, data.refreshToken);

      const userData = await fetchUser(data.accessToken);
      setUser(userData);

      if (!userData.name || !userData.surname || !userData.phone || !userData.address || !userData.profileImage) {
        localStorage.clear();
        router.push('/fullfill-profile');
      } else {
        localStorage.clear();
        router.push('/list');
      }
    } catch (error: any) {
      setServerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {serverError && <div className="font-bold text-xl text-red-500">{serverError}</div>}
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
                <Input type="password" placeholder="Your password" {...field} />
              </FormControl>
              <FormDescription>Your password must be secure.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
              <span className="ml-2">Logging in...</span>
            </div>
          ) : (
            'Login'
          )}
        </Button>
        {form.formState.errors && (
          <div className="text-xl font-bold text-red-500">
            {form.formState.errors.email?.message || form.formState.errors.password?.message}
          </div>
        )}
      </form>
    </Form>
  );
}
