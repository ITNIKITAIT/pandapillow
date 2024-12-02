'use server';

import { Packaging, PillowFiller } from '@prisma/client';
import prisma from '../../../../prisma/db';

export type SaveConfigArgs = {
    filler: PillowFiller;
    packaging: Packaging;
    configId: string;
};

export const saveConfig = async ({
    filler,
    packaging,
    configId,
}: SaveConfigArgs) => {
    await prisma.configuration.update({
        where: {
            id: configId,
        },
        data: {
            filler,
            packaging,
        },
    });
};
