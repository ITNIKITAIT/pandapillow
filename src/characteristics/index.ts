import { Packaging, PillowFiller } from '@prisma/client';

export interface IFiller {
    label: string;
    value: PillowFiller;
    description: string | undefined;
    price: number;
}

export interface IPackaging {
    label: string;
    value: Packaging;
    description: string | undefined;
    price: number;
}

export interface ISize {
    label: string;
    value: string;
}

export const FILLERS: {
    name: string;
    options: IFiller[];
} = {
    name: 'Filler',
    options: [
        {
            label: 'Feather',
            value: 'feather',
            description: 'Natural feather filling for a soft yet firm feel.',
            price: 0,
        },
        {
            label: 'Polyester Fiberfill',
            value: 'polyester_fiberfill',
            description:
                'Affordable and lightweight synthetic filling, suitable for most preferences.',
            price: 0,
        },
        {
            label: 'Cotton',
            value: 'cotton',
            description: 'Natural and breathable, offering firm support.',
            price: 0,
        },
        {
            label: 'Wool',
            value: 'wool',
            description:
                'Natural wool filling for warmth and moisture regulation.',
            price: 3,
        },
        {
            label: 'Down',
            value: 'down',
            description:
                'Premium natural down for ultimate softness and luxury.',
            price: 5,
        },
        {
            label: 'Latex',
            value: 'latex',
            description:
                'Durable and hypoallergenic, with great support and resilience.',
            price: 5,
        },
        {
            label: 'Memory Foam',
            value: 'memory_foam',
            description:
                'Adaptive foam that conforms to the shape of your head and neck.',
            price: 8,
        },
        {
            label: 'Silk',
            value: 'silk',
            description:
                'Luxurious and hypoallergenic filling, offering unmatched softness and comfort.',
            price: 10,
        },
    ],
};

export const PACKAGING: {
    name: string;
    options: IPackaging[];
} = {
    name: 'Packaging',
    options: [
        {
            label: 'Standard',
            value: 'standard',
            description: 'Basic, eco-friendly packaging',
            price: 0,
        },
        {
            label: 'Gift Wrap',
            value: 'gift_wrap',
            description: 'Elegant gift wrap with a ribbon',
            price: 5,
        },
        {
            label: 'Reusable Bag',
            value: 'reusable_bag',
            description:
                'Stylish and durable fabric bag that can be reused for storage',
            price: 8,
        },
    ],
};

export const SIZES = {
    name: 'Size',
    options: [
        {
            label: '50x50',
            value: '50x50',
        },
        {
            label: '50x70',
            value: '50x70',
        },
    ],
};

export const BASE_PRICE = 30;
