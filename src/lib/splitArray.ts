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
