'use client';
import { splitArray } from '@/lib/utils';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ReviewCol from './ReviewCol';

const ReviewGrid = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.4 });

    const pillows = [
        '/pillows/pillow1.png',
        '/pillows/pillow2.png',
        '/pillows/pillow3.png',
        '/pillows/pillow4.png',
        '/pillows/pillow5.png',
        '/pillows/pillow6.png',
        '/custom-pillow.png',
    ];
    const columns = splitArray(pillows, 3);

    return (
        <div
            ref={containerRef}
            className="relative my-24 grid h-[750px] max-h-[130vh] gap-5 overflow-hidden px-4 sm:my-20 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {isInView && (
                <>
                    <ReviewCol pillows={[...columns[0]]} speed={10} />
                    <ReviewCol
                        className="hidden md:block"
                        pillows={[...columns[1]]}
                        speed={15}
                    />
                    <ReviewCol
                        className="hidden lg:block"
                        pillows={[...columns[2]]}
                        speed={10}
                    />
                </>
            )}

            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white"></div>
        </div>
    );
};

export default ReviewGrid;
