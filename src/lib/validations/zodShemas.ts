import { z } from 'zod';

export const emailSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email must be a valid email address' }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is requred' })
    .email({ message: 'Must be a valid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required'),
});

export type LoginSchema = typeof loginSchema;

export const registerSchema = z
  .object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(1, 'Username is required')
      .max(64, 'Username must be less than 64 characters')
      .trim(),
    fullName: z
      .string({ required_error: 'Name is required' })
      .min(1, 'Name is required')
      .trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Email must be a valid email address' }),
    password: z
      .string({ required_error: 'Password is required' })
      .regex(
        new RegExp(
          '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$'
        ),
        'One uppercase, one lower, one special character, and a number required'
      ),
    passwordConfirm: z
      .string({ required_error: 'Need to confirm password' })
      .regex(
        new RegExp(
          '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$'
        ),
        'One uppercase, one lower, one special character, and a number required'
      ),
    termsOfService: z.literal(true, {
      required_error: 'Need to accept terms of service',
    }),
  })
  .superRefine(({ passwordConfirm, password }, ctx) => {
    if (passwordConfirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['password'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['passwordConfirm'],
      });
    }
  });

export type RegisterSchema = typeof registerSchema;

export const updateUserDetailsSchema = z.object({
  fullName: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .trim(),
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required')
    .trim(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ required_error: 'Need to enter the old password' })
      .min(1, 'Need to enter the old password')
      .trim(),
    newPassword: z
      .string({ required_error: 'A new password is required' })
      .regex(
        new RegExp(
          '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$'
        ),
        'One uppercase, one lower, one special character, and a number required'
      ),
    newPasswordConfirm: z
      .string({ required_error: 'Need to confirm the new password' })
      .regex(
        new RegExp(
          '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$'
        ),
        'One uppercase, one lower, one special character, and a number required'
      ),
  })
  .superRefine(({ newPassword, newPasswordConfirm }, ctx) => {
    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['newPassword'],
      });
      ctx.addIssue({
        code: 'custom',
        message: 'Password and confirm password must match',
        path: ['newPasswordConfirm'],
      });
    }
  });

export const profileDetailsSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .trim(),
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required')
    .trim(),
});

export const stratSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name is required')
    .trim(),
  description: z.string().optional(),
  map: z.string(),
  position: z.string(),
  privacy: z.enum(['PUBLIC', 'PRIVATE']),
  team: z.string(),
});

export const teamSchema = z.object({
  name: z
    .string({ required_error: 'Team neam is required' })
    .min(1, 'Team name is required')
    .trim(),
  org: z
    .string({ required_error: 'Organization is required' })
    .min(1, 'Organization is required')
    .trim(),
  role: z
    .string({ required_error: 'Need to select a role' })
    .min(1, 'Need to select a role')
    .trim(),
});

export const invitePlayerSchema = z.object({
  username: z
    .string({ required_error: 'Username is required' })
    .min(1, 'Username is required')
    .trim(),
  teamId: z.number({ required_error: 'Team id is required' }),
  role: z
    .string({ required_error: 'Role is required ' })
    .min(1, 'Role is required')
    .trim(),
  senderId: z.number({ required_error: 'Sender id is required' }),
});

export type InvitePlayerSchema = typeof invitePlayerSchema;

export const reportBugSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, 'Title is required')
    .trim(),
  description: z
    .string({ required_error: 'Description is required' })
    .min(1, 'Descriptions is required')
    .trim(),
});

export type ReportBugSchema = typeof reportBugSchema;

export const forgotPasswordEmailSchema = z.object({
  email: z.string().email(),
});

export const forgotPasswordUpdateSchema = z.object({
  newPassword: z
    .string({ required_error: 'A new password is required' })
    .regex(
      new RegExp(
        '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$'
      ),
      'One uppercase, one lower, one special character, and a number required'
    ),
  newPasswordConfirm: z
    .string({ required_error: 'Need to confirm the new password' })
    .regex(
      new RegExp(
        '^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,}$'
      ),
      'One uppercase, one lower, one special character, and a number required'
    ),
  token: z.string(),
});
