import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    className?: string;
}

const Container = ({ children, className }: Props) => {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-screen-xl px-3 md:px-20',
                className
            )}>
            {children}
        </div>
    );
};

export default Container;
