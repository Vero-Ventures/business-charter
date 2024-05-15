'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { addContact } from './actions';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormSubmitButton from '@/components/form-submit-button';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

export type InsertContact = z.infer<typeof formSchema>;

export function FamilyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<InsertContact>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(values: InsertContact) {
    setIsSubmitting(true);
    await addContact(values);
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add family member by email:</FormLabel>
              <FormControl>
                <Input
                  placeholder="contact@videre.com"
                  type="email"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          defaultText="Add Family Member"
          loadingText="Adding..."
          disabled={isSubmitting}
        />
      </form>
    </Form>
  );
}