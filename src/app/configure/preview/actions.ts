'use server';

import { stripe } from '@/lib/stripe';
import prisma from '../../../../prisma/db';
import { BASE_PRICE } from '@/consts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const createCheckoutSession = async ({
    configId,
}: {
    configId: string;
}) => {
    const configuration = await prisma.configuration.findUnique({
        where: {
            id: configId,
        },
        include: {
            pillowFiller: true,
            pillowPackaging: true,
            pillowSize: true,
        },
    });

    if (!configuration) {
        throw new Error('No such configuration found');
    }

    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user) {
        throw new Error('You need to be logged in');
    }

    const { pillowFiller, pillowPackaging } = configuration;

    const amount =
        BASE_PRICE +
        (pillowFiller ? pillowFiller?.price : 0) +
        (pillowPackaging ? pillowPackaging?.price : 0);

    let order = await prisma.order.findFirst({
        where: {
            userId: user.id,
            configurationId: configuration.id,
        },
    });

    if (!order) {
        order = await prisma.order.create({
            data: {
                amount,
                userId: user.id,
                configurationId: configuration.id,
            },
        });
    }

    const product = await stripe.products.create({
        name: 'Custom Pillow',
        images: [configuration.imageUrl],
        default_price_data: {
            currency: 'USD',
            unit_amount: amount * 100,
        },
    });

    const stripeSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${order.id}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
        shipping_address_collection: {
            allowed_countries: ['UA', 'US', 'DE'],
        },
        metadata: {
            userId: user.id,
            order_id: order.id,
        },
        line_items: [
            {
                price: product.default_price as string,
                quantity: 1,
            },
        ],
    });

    return { url: stripeSession.url };
};
