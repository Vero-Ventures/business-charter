'use client';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';
import FormSubmitButton from '@/components/form-submit-button';
import Link from 'next/link';
import { signup } from '../actions';

const signupFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address.' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
    role: z.enum(['admin', 'user'], {
      required_error: 'Please select a role',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type SignupFormSchema = z.infer<typeof signupFormSchema>;

export default function SignupForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const form = useForm<SignupFormSchema>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      role: 'user',
    },
  });

  async function onSubmit({ email, password, role }: SignupFormSchema) {
    setIsSubmitting(true);
    const error = await signup(email, password, role);
    if (error) {
      console.error('Signup Error:', error.message);
      setError(error.message);
    } else {
      setError("");
    }
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto grid w-full max-w-lg items-center gap-4">
        <h1 className="mb-4 text-center text-3xl font-bold">Signup</h1>
        {error && (
          <p className="text-center text-destructive">
            There was an error creating your account.
          </p>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm Your Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-center">
          <label className="block mb-2 text-lg font-medium text-gray-700">I am a(n):</label>
          <div className="flex justify-center gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="user"
                {...form.register("role")}
                className="form-radio text-indigo-600 transition duration-150 ease-in-out"
                defaultChecked
              />
              <span className="ml-2">Family Member</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="admin"
                {...form.register("role")}
                className="form-radio text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2">Advisor</span>
            </label>
          </div>
        </div>
        <FormSubmitButton
          disabled={isSubmitting}
          defaultText="Create Account"
          loadingText="Please Wait..."
        />
        <div className="mt-4 flex gap-2 justify-center">
          <p>Already have an account?</p>
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
