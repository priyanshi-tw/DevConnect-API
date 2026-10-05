import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().min(4, 'First name must be at least 4 characters'),

  lastName: z.string().optional(),

  emailId: z.email().trim().toLowerCase(),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  age: z.number().min(18).optional(),

  gender: z.enum(['male', 'female', 'other']).optional(),

  photoUrl: z.url('Photo URL must be a valid URL').optional().default('https://www.w3schools.com/howto/img_avatar.png'),

  about: z.string().optional().default('This is the default about section. You can update it later.'),

  skills: z.array(z.string()).optional(),
});
