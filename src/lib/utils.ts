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
