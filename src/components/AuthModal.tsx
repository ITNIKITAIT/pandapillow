import { Dispatch, SetStateAction, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import Image from 'next/image';
import { buttonVariants } from './ui/button';
import LoginForm from './LoginForm';

export type AuthModalType = 'login' | 'register';

const AuthModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    const [type, setType] = useState<AuthModalType>('login');

    const onSwitchType = () => {
        setType(type === 'login' ? 'register' : 'login');
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
            <DialogContent className="!p-3 !pb-5 sm:max-w-[500px] max-w-[95%] rounded-[10px]">
                <DialogHeader>
                    <div className="relative mx-auto w-[130px] h-[130px] mb-2">
                        <Image
                            src="/stickers/panda-4.png"
                            alt="panda image"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <DialogTitle className="text-3xl text-center font-bold tracking-tight text-gray-900">
                        Log in to continue
                    </DialogTitle>
                    <DialogDescription className="text-base text-center py-2">
                        <span className="font-medium text-zinc-900">
                            Your configuration was saved!
                        </span>{' '}
                        Please login or create an account to complete your
                        purchase.
                    </DialogDescription>
                </DialogHeader>

                {type === 'login' && <LoginForm onClose={onClose} />}

                <button
                    onClick={onSwitchType}
                    className={buttonVariants({ variant: 'outline' })}>
                    {type === 'login' ? 'Register' : 'Login'}
                </button>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModal;
