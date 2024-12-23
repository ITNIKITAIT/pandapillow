import { Dispatch, SetStateAction } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import Image from 'next/image';
import { buttonVariants } from './ui/button';

const LoginModal = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
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
                <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
                    <button className={buttonVariants({ variant: 'outline' })}>
                        Login
                    </button>
                    <button className={buttonVariants({ variant: 'default' })}>
                        Register
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoginModal;
