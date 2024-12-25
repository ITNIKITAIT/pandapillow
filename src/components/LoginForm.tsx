import { formLoginSchema, TFormLoginValues } from '@/schemas';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buttonVariants } from './ui/button';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';

const LoginForm = ({ onClose }: { onClose: () => void }) => {
    const { toast } = useToast();
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const errors = form.formState.errors;

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const response = await signIn('credentials', {
                ...data,
                redirect: false,
            });

            if (!response?.ok) {
                throw new Error();
            }

            onClose();
        } catch (err) {
            console.error(err);
            toast({
                title: 'Failed to login',
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
                        required
                        className="w-full border-zinc-800 border-[1px] rounded-sm py-1 px-2 sm:py-1.5 sm:px-3 outline-none text-base"
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password.message}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className={buttonVariants({ variant: 'default' })}>
                    Login
                </button>
            </form>
        </FormProvider>
    );
};

export default LoginForm;
