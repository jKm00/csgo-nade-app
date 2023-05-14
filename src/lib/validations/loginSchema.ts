import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'Email is requred'})
    .email({ message: 'Must be a valid email'}),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
})