'use server';

import prisma from '../../../prisma/db';

export const getPaymentStatus = async ({ orderId }: { orderId: string }) => {
    const user = { id: '1', email: 'test' };

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
        throw new Error('This order does not not exist');
    }

    if (order.isPaid) {
        return order;
    } else {
        return false;
    }
};
