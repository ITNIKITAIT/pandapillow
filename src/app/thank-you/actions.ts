'use server';

import { getServerSession } from 'next-auth';
import prisma from '../../../prisma/db';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!user?.id || !user?.email) {
        throw new Error('You need to be logged in to view this page.');
    }

    const order = await prisma.order.findFirst({
        where: {
            id: orderId,
            userId: user.id,
        },
        include: {
            billingAddress: true,
            configuration: {
                include: {
                    pillowSize: true,
                },
            },
            shippingAddress: true,
            user: true,
        },
    });

    if (!order) {
        throw new Error('This order does not exist');
    }

    if (order.isPaid) {
        return order;
    } else {
        return false;
    }
};
