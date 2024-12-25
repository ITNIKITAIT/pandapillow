import { z } from 'zod';

const passwordSchema = z
    .string()
    .min(6, { message: 'Password must be more than 6 chars' });

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Incorrect email' }),
    password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            confirmPassword: passwordSchema,
        })
    )
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
