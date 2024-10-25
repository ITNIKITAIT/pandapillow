'use client';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import Review from './Review';

interface Props {
    pillows: string[];
    className?: string;
    speed: number;
}

const ReviewCol = ({ pillows, className, speed }: Props) => {
    const [columnHeight, setColumnHeight] = useState(0);
    const columnRef = useRef<HTMLDivElement | null>(null);

    const duration = `${columnHeight * speed}ms`;

    useEffect(() => {
        if (!columnRef.current) return;

        const resizeObserver = new window.ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0);
        });

        resizeObserver.observe(columnRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <div
            ref={columnRef}
            className={cn(
                'animate-marquee space-y-8 py-4 h-fit w-fit m-auto md:m-0',
                className
            )}
            style={{ '--marquee-duration': duration } as React.CSSProperties}>
            {pillows.concat(pillows).map((imgSrc, index) => (
                <Review key={index} imgSrc={imgSrc} />
            ))}
        </div>
    );
};

export default ReviewCol;
