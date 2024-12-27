import { OrderStatus } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const splitArray = <T>(arr: Array<T>, num: number) => {
    const result: Array<Array<T>> = [];
    for (let i = 0; i < arr.length; i++) {
        const index = i % num;
        if (!result[index]) {
            result[index] = [];
        }
        result[index].push(arr[i]);
    }

    return result;
};

export const formatPrice = (price: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(price);
};

export const normalizeOrderStatus = (name: OrderStatus) => {
    return name
        .replace('_', ' ')
        .split(' ')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(' ');
};

export const base64ToBlob = (base64: string, type: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
};

export const FilledTexture = async (imageUrl: string) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageUrl;

    await new Promise((resolve) => (image.onload = resolve));
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Unable to get canvas context');
    }
    ctx.drawImage(image, 0, 0);

    return canvas;
};
