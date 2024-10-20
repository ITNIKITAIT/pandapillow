import Container from '@/components/Container';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="bg-slate-50">
            <section>
                <Container>
                    <div className="flex justify-between flex-col sm:gap-10 items-center py-16 sm:py-24 lg:flex-row lg:gap-0">
                        <div className="relative max-w-full lg:max-w-[540px] xl:max-w-[700px]">
                            <h1 className="relative tracking-tight text-balance font-bold text-gray-900 !leading-tight text-5xl md:text-6xl lg:text-7xl text-center lg:text-left">
                                Your Image on a{' '}
                                <span className="text-white bg-purple-600 px-2">
                                    Custom
                                </span>{' '}
                                Pillow
                                <Image
                                    alt="cat"
                                    width={200}
                                    height={200}
                                    src="/stickers/panda.png"
                                    className="hidden absolute -top-[130px] left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 pointer-events-none sm:block"
                                />
                            </h1>
                            <p className="mt-8 text-lg max-w-prose text-center lg:text-left text-balance">
                                Capture your favorite memories with your own,{' '}
                                <span className="font-semibold">
                                    one-of-one
                                </span>{' '}
                                phone case. CatPillow allows you to protect your
                                memories, not just your phone case.
                            </p>

                            <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center lg:items-start">
                                <li className="flex gap-1.5 items-center">
                                    <Check className="h-5 w-5 text-purple-600" />
                                    High-quality, durable material
                                </li>
                                <li className="flex gap-1.5 items-center">
                                    <Check className="h-5 w-5 text-purple-600" />
                                    5 year print guarantee
                                </li>
                                <li className="flex gap-1.5 items-center">
                                    <Check className="h-5 w-5 text-purple-600" />
                                    Beautiful pillows supported
                                </li>
                            </ul>

                            <div className="mt-12 flex flex-col justify-center sm:flex-row items-center gap-5 lg:justify-start">
                                <div className="flex -space-x-4">
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                        src="/users/user-1.jpg"
                                        alt="User"
                                    />
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                        src="/users/user-2.jpg"
                                        alt="User"
                                    />
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                        src="/users/user-3.png"
                                        alt="User"
                                    />
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                        src="/users/user-4.jpg"
                                        alt="User"
                                    />
                                    <Image
                                        width={40}
                                        height={40}
                                        className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                        src="/users/user-5.jpg"
                                        alt="User"
                                    />
                                </div>

                                <div className="flex flex-col gap-1 items-center md:items-start">
                                    <div className="flex gap-0.5">
                                        <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                        <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                        <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                        <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                        <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                    </div>

                                    <p>
                                        <span className="font-semibold">
                                            2.500
                                        </span>{' '}
                                        happy customers
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Image
                                width={450}
                                height={450}
                                className="-rotate-6 pointer-events-none"
                                src="/custom-pillow.png"
                                alt="User"
                            />
                            <Image
                                width={80}
                                height={80}
                                className="absolute bottom-4 left-8 -rotate-6 pointer-events-none"
                                src="/line.png"
                                alt="User"
                            />
                            <Image
                                width={200}
                                height={200}
                                className="hidden absolute -top-8 -right-20 pointer-events-none sm:block"
                                src="/your-image.png"
                                alt="User"
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
