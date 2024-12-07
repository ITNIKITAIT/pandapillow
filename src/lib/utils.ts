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

export const base64ToBlob = (base64: string, type: string) => {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
};
