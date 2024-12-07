import { PillowFiller, PillowPackaging, PillowSize } from '@prisma/client';

export type Options = {
    filler: PillowFiller | null;
    size: PillowSize | null;
    packaging: PillowPackaging | null;
};
