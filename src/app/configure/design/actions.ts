'use server';

import prisma from '../../../../prisma/db';

export const getPillowSizes = async () => {
    return await prisma.pillowSize.findMany();
};
export const getPillowFillers = async () => {
    return await prisma.pillowFiller.findMany({
        orderBy: {
            price: 'asc',
        },
    });
};
export const getPillowPackaging = async () => {
    return await prisma.pillowPackaging.findMany({
        orderBy: {
            price: 'asc',
        },
    });
};
export const getCroppedImage = async (imageUrl: string) => {
    return await prisma.configuration.findFirst({
        where: { imageUrl },
    });
};

export type SaveConfigArgs = {
    pillowFillerId: number;
    pillowPackagingId: number;
    pillowSizeId: number;
    configId: string;
};

export const saveConfig = async ({
    pillowFillerId,
    pillowPackagingId,
    configId,
    pillowSizeId,
}: SaveConfigArgs) => {
    await prisma.configuration.update({
        where: {
            id: configId,
        },
        data: {
            pillowFillerId,
            pillowPackagingId,
            pillowSizeId,
        },
    });
};
