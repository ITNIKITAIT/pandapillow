import { formRegisterSchema, TFormRegisterValues } from '@/schemas';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buttonVariants } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { registerUser } from '@/app/api/actions';
import { signIn } from 'next-auth/react';

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
    const { toast } = useToast();
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const errors = form.formState.errors;

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            const createdUser = await registerUser({
                email: data.email,
                password: data.password,
            });

            const response = await signIn('credentials', {
                email: createdUser.email,
                password: data.password,
                redirect: false,
            });

            if (!response?.ok) {
                throw new Error();
            }

            onClose();
            toast({
                title: 'You have successfully registered',
                variant: 'success',
            });
        } catch (err) {
            console.error(err);
            toast({
                title: 'User already exists',
                variant: 'destructive',
            });
        }
    };

    return (
        <FormProvider {...form}>
            <form
                className="flex flex-col gap-5"
                onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-base font-semibold">
                        Email
                    </label>
                    <input
                        {...form.register('email')}
                        type="email"
                        id="email"
                        required
                        className="w-full border-zinc-800 border-[1px] rounded-sm py-1 px-2 sm:py-1.5 sm:px-3 outline-none text-base"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="password"
                        className="text-base font-semibold">
                        Password
                    </label>
                    <input
                        {...form.register('password')}
                        type="password"
                        id="password"
                        required
                        className="w-full border-zinc-800 border-[1px] rounded-sm py-1 px-2 sm:py-1.5 sm:px-3 outline-none text-base"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="confirmPassword"
                        className="text-base font-semibold">
                        Confirm Password
                    </label>
                    <input
                        {...form.register('confirmPassword')}
                        type="password"
                        id="confirmPassword"
                        required
                        className="w-full border-zinc-800 border-[1px] rounded-sm py-1 px-2 sm:py-1.5 sm:px-3 outline-none text-base"
                    />
                    {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                            {errors.confirmPassword.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className={buttonVariants({ variant: 'default' })}>
                    Register
                </button>
            </form>
        </FormProvider>
    );
};

export default RegisterForm;
