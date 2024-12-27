'use server';

import { OrderStatus } from '@prisma/client';
import prisma from '../../../prisma/db';

export const getOrders = async () => {
    const orders = await prisma.order.findMany({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            user: true,
            shippingAddress: true,
        },
    });

    const lastWeekSum = await prisma.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 7)),
            },
        },
        _sum: {
            amount: true,
        },
    });

    const lastMonthSum = await prisma.order.aggregate({
        where: {
            isPaid: true,
            createdAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30)),
            },
        },
        _sum: {
            amount: true,
        },
    });

    return { orders, lastWeekSum, lastMonthSum };
};

export const changeOrderStatus = async ({
    id,
    newStatus,
}: {
    id: string;
    newStatus: OrderStatus;
}) => {
    await prisma.order.update({
        where: { id },
        data: { status: newStatus },
    });
};
