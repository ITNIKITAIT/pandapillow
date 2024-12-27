'use client';
import Link from 'next/link';
import Container from './Container';
import { ArrowRight } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import AuthModal from './AuthModal';

const Navbar = () => {
    const { data: session } = useSession();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onOpen = () => {
        setIsModalOpen(true);
    };
    return (
        <nav className="sticky top-0 z-[49] w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />

            <Container>
                <div className="flex h-14 items-center justify-between">
                    <Link href="/" className="font-semibold text-2xl">
                        Panda<span className="text-violet-600">Pillow</span>
                    </Link>

                    <div className="flex items-center gap-1 h-full sm:gap-5">
                        {!session ? (
                            <>
                                <button
                                    onClick={onOpen}
                                    className={buttonVariants({
                                        variant: 'ghost',
                                    })}>
                                    Sign up
                                </button>
                                <button
                                    onClick={onOpen}
                                    className={buttonVariants({
                                        variant: 'ghost',
                                    })}>
                                    Login
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => signOut({ redirect: false })}
                                    className={buttonVariants({
                                        variant: 'ghost',
                                    })}>
                                    Sign out
                                </button>
                                {session?.user.role === 'ADMIN' && (
                                    <Link
                                        href="/dashboard"
                                        className={buttonVariants({
                                            variant: 'ghost',
                                        })}>
                                        Dashboard ✨
                                    </Link>
                                )}
                            </>
                        )}

                        <div className="hidden sm:block h-8 w-px bg-zinc-200"></div>
                        <Link
                            href={'/configure/upload'}
                            className={buttonVariants({
                                className: 'hidden sm:flex items-center gap-2',
                            })}>
                            Create pillow
                            <ArrowRight className="ml-1.5 !h-5 !w-5"></ArrowRight>
                        </Link>
                    </div>
                </div>
            </Container>
        </nav>
    );
};

export default Navbar;
