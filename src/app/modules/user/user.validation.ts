import { z } from 'zod';

const userZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
    role: z.enum(['admin', 'super admin', 'user']).optional(),
    phone: z.string({
      required_error: 'Number is required',
    }),
  }),
});

export const userZodValidation = {
  userZodSchema,
};
