import Container from '@/components/Container';
import { Check, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    return (
        <div>
            <section className="bg-slate-50">
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
                                pillow. CatPillow allows you to cuddle with your
                                memories, not just display them.
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
                                    Beautifully crafted pillows
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

            {/* what customers say */}
            <section className="bg-slate-100 py-16 md:py-24">
                <Container>
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-4">
                        <h2 className="order-1 tracking-tight text-center text-balance !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                            What our{' '}
                            <span className="relative">
                                customers{' '}
                                <svg
                                    className="absolute hidden sm:block -bottom-6 left-0 text-purple-500 inset-x-0 pointer-events-none"
                                    viewBox="0 0 687 155">
                                    <g
                                        stroke="currentColor"
                                        strokeWidth="7"
                                        fill="none"
                                        fillRule="evenodd"
                                        strokeLinecap="round"
                                        strokeLinejoin="round">
                                        <path
                                            d="M20 98c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"
                                            opacity=".3"></path>
                                        <path d="M20 118c27-13.3333333 54-20 81-20 40.5 0 40.5 20 81 20s40.626917-20 81-20 40.123083 20 80.5 20 40.5-20 81-20 40.5 20 81 20 40.626917-20 81-20c26.915389 0 53.748722 6.6666667 80.5 20"></path>
                                    </g>
                                </svg>
                            </span>{' '}
                            say
                        </h2>
                        <Image
                            width={150}
                            height={50}
                            src="/stickers/panda-lies.png"
                            alt="panda"
                            className="order-0 lg:order-2"
                        />
                    </div>

                    <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-16 px-4 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="flex flex-col gap-4 lg:pr-16">
                            <div className="flex gap-0.5 mb-2">
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                            </div>

                            <div className="text-lg leading-8">
                                <p>
                                    {'"'}The pillow feels incredibly soft and I
                                    even got a compliment on the design. I{"'"}
                                    ve had the pillow for two and a half months
                                    now, and the{' '}
                                    <span className="px-0.5 bg-slate-700 text-white">
                                        image is still super clear
                                    </span>
                                    . On the pillow I had before, the design
                                    started fading after just a few weeks. Love
                                    it!{'"'}
                                </p>
                            </div>

                            <div className="flex gap-4 mt-2 items-center">
                                <Image
                                    width={50}
                                    height={50}
                                    className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                    src="/users/user-1.jpg"
                                    alt="User"
                                />
                                <div>
                                    <p className="font-semibold">Anna</p>
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-purple-600" />
                                        <p className="text-sm">
                                            Verified Purchase
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 lg:pr-16">
                            <div className="flex gap-0.5 mb-2">
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                                <Star className="h-5 w-5 text-purple-600 fill-purple-600" />
                            </div>

                            <div className="text-lg leading-8">
                                <p>
                                    {'"'}The{' '}
                                    <span className="px-0.5 bg-slate-700 text-white">
                                        quality of the pillow is amazing
                                    </span>
                                    , and the custom print turned out even{' '}
                                    <span className="px-0.5 bg-slate-700 text-white">
                                        better than I expected
                                    </span>
                                    . It’s been a few months, and the colors are
                                    still as vibrant as the day I received it.
                                    It’s the perfect addition to my living room,
                                    and everyone asks where I got it from!{'"'}
                                </p>
                            </div>

                            <div className="flex gap-4 mt-2 items-center">
                                <Image
                                    width={50}
                                    height={50}
                                    className="rounded-full h-10 w-10 object-cover ring-slate-100"
                                    src="/users/user-4.jpg"
                                    alt="User"
                                />
                                <div>
                                    <p className="font-semibold">John</p>
                                    <div className="flex items-center gap-1">
                                        <Check className="h-4 w-4 text-purple-600" />
                                        <p className="text-sm">
                                            Verified Purchase
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}
