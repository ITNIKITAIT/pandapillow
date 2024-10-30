'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const STEPS = [
    {
        name: 'Step 1: Add image',
        desc: 'Choose an image for your pillow',
        imgPath: '/stickers/panda-step1.png',
        url: '/upload',
    },
    {
        name: 'Step 2: Customize design',
        desc: 'Make the pillow yours',
        imgPath: '/stickers/panda-step2.png',
        url: '/design',
    },
    {
        name: 'Step 3: Summary',
        desc: 'Review your final design',
        imgPath: '/stickers/panda-step3.png',
        url: '/preview',
    },
];

const Steps = () => {
    const pathname = usePathname();

    return (
        <ul className="rouned-md bg-white lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200">
            {STEPS.map((step, i) => {
                const isCurrent = pathname.endsWith(step.url);
                const isCompleted = STEPS.slice(i + 1).some((step) =>
                    pathname.endsWith(step.url)
                );

                return (
                    <li key={i} className="relative overflow-hidden lg:flex-1">
                        <div>
                            <span
                                className={cn(
                                    'absolute left-0 bottom-0 h-full w-1 bg-zinc-400 lg:w-full lg:h-1',
                                    {
                                        'bg-zinc-700': isCurrent,
                                        'bg-primary': isCompleted,
                                    }
                                )}
                            />
                            <div
                                className={cn(
                                    i !== 0 && 'lg:pl-9',
                                    'flex items-center px-6 py-4 text-sm font-medium'
                                )}>
                                <span className="flex-shrink-0">
                                    <Image
                                        src={step.imgPath}
                                        width={80}
                                        height={80}
                                        alt="panda"
                                        className={cn(
                                            'flex object-contain items-center justify-center',
                                            {
                                                'border-none': isCompleted,
                                                'border-zinc-700': isCurrent,
                                            }
                                        )}
                                    />
                                </span>

                                <span className="ml-4 h-full mt-0.5 flex flex-col justify-center">
                                    <span
                                        className={cn(
                                            'text-sm font-semibold text-zinc-700',
                                            {
                                                'text-primary': isCompleted,
                                                'text-zinc-700': isCurrent,
                                            }
                                        )}>
                                        {step.name}
                                    </span>
                                    <span className="text-sm text-zinc-500">
                                        {step.desc}
                                    </span>
                                </span>
                            </div>

                            {/* separator */}
                            {i !== 0 && (
                                <div className="absolute inset-0 hidden w-3 lg:block">
                                    <svg
                                        className="h-full w-full text-gray-300"
                                        viewBox="0 0 12 82"
                                        fill="none"
                                        preserveAspectRatio="none">
                                        <path
                                            d="M0.5 0V31L10.5 41L0.5 51V82"
                                            stroke="currentcolor"
                                            vectorEffect="non-scaling-stroke"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default Steps;
