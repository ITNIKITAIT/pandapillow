import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ArrowRight, Check, ChevronsUpDown, Loader2 } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { cn, formatPrice } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { BASE_PRICE } from '@/consts';
import { Options } from './types';
import { useQueries } from '@tanstack/react-query';
import {
    getPillowFillers,
    getPillowPackaging,
    getPillowSizes,
    SaveConfigArgs,
} from '@/app/configure/design/actions';

interface Props {
    options: Options;
    setOptions: React.Dispatch<React.SetStateAction<Options>>;
    saveConfig: (args: SaveConfigArgs) => void;
    configId: string;
    isPending: boolean;
}

const PriceConfigurator = ({
    options,
    setOptions,
    saveConfig,
    configId,
    isPending,
}: Props) => {
    const { sizes, fillers, packages } = useQueries({
        queries: [
            {
                queryKey: ['sizes'],
                queryFn: async () => {
                    const pillowSizes = await getPillowSizes();
                    setOptions((prev) => ({ ...prev, size: pillowSizes[0] }));
                    return pillowSizes;
                },
            },
            {
                queryKey: ['fillers'],
                queryFn: async () => {
                    const pillowFillers = await getPillowFillers();
                    setOptions((prev) => ({
                        ...prev,
                        filler: pillowFillers[0],
                    }));
                    return pillowFillers;
                },
            },
            {
                queryKey: ['packages'],
                queryFn: async () => {
                    const pillowPackaging = await getPillowPackaging();
                    setOptions((prev) => ({
                        ...prev,
                        packaging: pillowPackaging[0],
                    }));
                    return pillowPackaging;
                },
            },
        ],
        combine: (results) => {
            return {
                sizes: results[0].data,
                fillers: results[1].data,
                packages: results[2].data,
            };
        },
    });
    const isLoading = !options.filler || !options.packaging || !options.size;

    const calcPrice = () => {
        return BASE_PRICE + options.filler!.price + options.packaging!.price;
    };

    return (
        <div className="h-[600px] w-full col-span-full lg:col-span-1 flex flex-col">
            <ScrollArea className="relative overflow-auto">
                <div className="absolute z-10 inset-x-0 bottom-0 h-12" />
                <div className="px-8 pb-12 pt-8">
                    <h2 className="tracking-tight font-bold text-3xl border-b border-zinc-200 pb-6">
                        Customize your pillow
                    </h2>

                    <div className="relative mt-4 h-full flex flex-col gap-6">
                        <div className="relative flex flex-col gap-3 w-full">
                            <h3 className="font-semibold">Size</h3>

                            {sizes ? (
                                <RadioGroup defaultValue={sizes[0].label}>
                                    {sizes.map((size) => (
                                        <div
                                            key={size.label}
                                            className="flex items-center">
                                            <RadioGroupItem
                                                value={size.label}
                                                id={size.label}
                                                className="peer hidden"
                                            />
                                            <Label
                                                onClick={() =>
                                                    setOptions((prev) => ({
                                                        ...prev,
                                                        size,
                                                    }))
                                                }
                                                htmlFor={size.label}
                                                className="relative w-full cursor-pointer rounded-lg bg-white px-6 py-4 border-2 shadow-sm border-zinc-200 focus:outline-none outline-none peer-aria-checked:border-primary transition-all hover:bg-slate-50">
                                                {size.label}
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : (
                                <Skeleton
                                    className="h-12 w-full mb-1"
                                    count={2}
                                />
                            )}
                        </div>

                        <div className="relative flex flex-col gap-3 w-full">
                            <h3 className="font-semibold">Filler</h3>
                            {fillers && options.filler ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className="w-full flex justify-between">
                                            {options.filler.label}
                                            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[280px]">
                                        {fillers.map((filler) => (
                                            <DropdownMenuItem
                                                onClick={() => {
                                                    setOptions((prev) => ({
                                                        ...prev,
                                                        filler,
                                                    }));
                                                }}
                                                className={cn(
                                                    'flex text-sm gap-1 items-center w-full p-2 cursor-default hover:bg-zinc-100',

                                                    filler.label ===
                                                        options.filler!.label &&
                                                        'bg-zinc-100'
                                                )}
                                                key={filler.label}>
                                                <Check
                                                    className={cn(
                                                        'h-4 w-4 mr-2',

                                                        filler.label ===
                                                            options.filler!
                                                                .label
                                                            ? 'opacity-100'
                                                            : 'opacity-0'
                                                    )}
                                                />
                                                {filler.label}
                                                <div className="ml-auto">
                                                    {formatPrice(filler.price)}
                                                </div>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Skeleton className="h-8 w-full mb-1" />
                            )}
                        </div>

                        <div className="relative flex flex-col gap-3 w-full">
                            <h3 className="font-semibold">Packaging</h3>
                            {packages ? (
                                <RadioGroup defaultValue={packages[0].label}>
                                    {packages.map((pack) => (
                                        <div
                                            key={pack.label}
                                            className="flex items-center">
                                            <RadioGroupItem
                                                value={pack.label}
                                                id={pack.label}
                                                className="peer hidden"
                                            />
                                            <Label
                                                onClick={() =>
                                                    setOptions((prev) => ({
                                                        ...prev,
                                                        packaging: pack,
                                                    }))
                                                }
                                                htmlFor={pack.label}
                                                className="relative w-full cursor-pointer rounded-lg bg-white px-6 py-4 border-2 shadow-sm border-zinc-200 focus:outline-none outline-none peer-aria-checked:border-primary transition-all hover:bg-slate-50">
                                                <div className="flex justify-between">
                                                    <span>{pack.label}</span>
                                                    <span className="text-gray-900">
                                                        {formatPrice(
                                                            pack.price
                                                        )}
                                                    </span>
                                                </div>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    {pack.description}
                                                </p>
                                            </Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            ) : (
                                <Skeleton
                                    className="h-16 w-full mb-1"
                                    count={3}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
            <div className="w-full px-8 h-20 bg-white flex items-center">
                <div className="border-t border-1 border-zinc-200 w-full h-full flex gap-6 items-center">
                    {!isLoading ? (
                        <p className="font-medium whitespace-nowrap">
                            {formatPrice(calcPrice())}
                        </p>
                    ) : (
                        <Skeleton className="!h-8 !w-14" />
                    )}

                    {isPending ? (
                        <Button size="sm" disabled className="w-full">
                            <Loader2 className="h-8 w-8 text-white animate-spin" />
                        </Button>
                    ) : !isLoading ? (
                        <Button
                            onClick={() => {
                                saveConfig({
                                    pillowPackagingId: options.packaging!.id,
                                    pillowFillerId: options.filler!.id,
                                    pillowSizeId: options.size!.id,
                                    configId,
                                });
                            }}
                            size="sm"
                            className="w-full">
                            Continue <ArrowRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button size="sm" disabled className="w-full">
                            Continue <ArrowRight className="h-4 w-4" />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PriceConfigurator;
