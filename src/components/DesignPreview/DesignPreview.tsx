'use client';
import { Prisma } from '@prisma/client';
import PillowViewer from '../PillowViewer';
import { FilledTexture, formatPrice } from '@/lib/utils';
import { ArrowRight, Check } from 'lucide-react';
import { BASE_PRICE } from '@/consts';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { createCheckoutSession } from '@/app/configure/preview/actions';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import AuthModal from '../AuthModal';
import { useSession } from 'next-auth/react';

type PreviewProps = Prisma.ConfigurationGetPayload<{
    include: { pillowFiller: true; pillowPackaging: true; pillowSize: true };
}>;

const DesignPreview = ({ configuration }: { configuration: PreviewProps }) => {
    const router = useRouter();
    const { toast } = useToast();
    const { data: isLogin } = useSession();

    const [isModalLogin, setIsModalLogin] = useState<boolean>(false);

    const { pillowSize, pillowFiller, pillowPackaging, croppedImageUrl } =
        configuration;

    const totalPrice = () => {
        return BASE_PRICE + pillowFiller!.price + pillowPackaging!.price;
    };

    const { mutate: createPayment, isPending } = useMutation({
        mutationKey: ['get-checkout-session'],
        mutationFn: createCheckoutSession,
        onSuccess: ({ url }) => {
            if (url) router.push(url);
            else throw new Error('Unable to retrieve payment URL.');
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                description: 'There was an error on our end. Please try again.',
                variant: 'destructive',
            });
        },
    });

    const handleCheckout = () => {
        if (isLogin) {
            createPayment({ configId: configuration.id });
        } else {
            setIsModalLogin(true);
        }
    };

    return (
        <div className="flex flex-col mt-20 md:grid grid-cols-1 md:grid-cols-6 text-sm md:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
            <AuthModal isOpen={isModalLogin} setIsOpen={setIsModalLogin} />

            <div className="mt-6 sm:col-span-4 sm:mt-0 md:row-end-1">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                    Your Beautiful pillow
                </h3>
                <div className="mt-3 flex items-center gap-1.5 text-base">
                    <Check className="h-4 w-4 text-purple-600" />
                    In stock and ready to ship
                </div>
            </div>

            <div className="mt-6 md:col-span-4 sm:mt-0 text-base">
                <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-y-6 sm:py-6 md:py-10">
                    <div>
                        <p className="font-medium text-zinc-950">Highlights</p>
                        <ol className="mt-3 text-zinc-700 list-disc marker:text-purple-600 list-inside">
                            <li>Hypoallergenic filling</li>
                            <li>Machine washable cover</li>
                            <li>Breathable and moisture-wicking fabric</li>
                            <li>Custom print durability up to 5 years</li>
                        </ol>
                    </div>
                    <div>
                        <p className="font-medium text-zinc-950">Materials</p>
                        <ol className="mt-3 text-zinc-700 list-disc marker:text-purple-600 list-inside">
                            <li>Soft and eco-friendly cotton or polyester</li>
                            <li>High-density foam or microfiber filling</li>
                            <li>Anti-pilling and fade-resistant coating</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className="col-span-6 md:col-span-2 md:row-span-2 md:row-end-2 h-[400px] md:h-auto">
                <PillowViewer
                    isStatic={true}
                    createCroppedImage={() => FilledTexture(croppedImageUrl!)}
                    type={pillowSize!.label}
                />
            </div>

            <div className="mt-8 col-span-6">
                <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
                    <div className="flow-root text-sm">
                        <div className="flex items-center justify-between py-1 mt-2">
                            <p className="text-gray-600">Base price</p>
                            <p className="font-medium text-gray-900">
                                {formatPrice(BASE_PRICE)}
                            </p>
                        </div>

                        {!!pillowFiller?.price && (
                            <div className="flex items-center justify-between py-1 mt-2">
                                <p className="text-gray-600">Filler</p>
                                <p className="font-medium text-gray-900">
                                    {formatPrice(pillowFiller.price)}
                                </p>
                            </div>
                        )}

                        {!!pillowPackaging?.price && (
                            <div className="flex items-center justify-between py-1 mt-2">
                                <p className="text-gray-600">Packaging</p>
                                <p className="font-medium text-gray-900">
                                    {formatPrice(pillowPackaging.price)}
                                </p>
                            </div>
                        )}

                        <div className="my-2 h-px bg-gray-200" />

                        <div className="flex justify-between items-center py-2 font-semibold text-gray-900">
                            <p>Order total</p>
                            <p>{formatPrice(totalPrice())}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end pb-12">
                    <Button
                        onClick={handleCheckout}
                        isPending={isPending}
                        className="px-4 sm:px-6 lg:px-8 min-w-[170px]">
                        Check out{' '}
                        <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DesignPreview;
