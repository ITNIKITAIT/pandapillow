'use client';

import NextImage from 'next/image';
import { Rnd } from 'react-rnd';
import HandleResizeComponent from '../ui/HandleResizeComponent';
import PillowViewer from '../PillowViewer';
import { Button, buttonVariants } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useRef, useState } from 'react';
import {
    BASE_PRICE,
    FILLERS,
    IFiller,
    IPackaging,
    ISize,
    PACKAGING,
    SIZES,
} from '@/characteristics';
import { ArrowRight, Check, ChevronsUpDown } from 'lucide-react';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { cn, formatPrice } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { useMutation } from '@tanstack/react-query';
import {
    saveConfig as _saveConfig,
    SaveConfigArgs,
} from '@/app/configure/design/actions';

interface Props {
    configId: string;
    imageUrl: string;
    imageSize: { width: number; height: number };
}

const DesignConfigurator = ({ configId, imageUrl, imageSize }: Props) => {
    const { toast } = useToast();

    const { mutate: saveConfig } = useMutation({
        mutationKey: ['save-config'],
        mutationFn: async (args: SaveConfigArgs) => {
            await Promise.all([saveConfiguration(), _saveConfig(args)]);
        },
        onError: () => {
            toast({
                title: 'Something went wrong',
                description: 'There was an error on our end, please try again',
                variant: 'destructive',
            });
        },
        onSuccess: () => {
            console.log('success');
        },
    });

    const [options, setOptions] = useState<{
        filler: IFiller;
        size: ISize;
        packaging: IPackaging;
    }>({
        filler: FILLERS.options[0],
        size: SIZES.options[0],
        packaging: PACKAGING.options[0],
    });

    const [renderedDimension, setRenderedDimension] = useState({
        width: imageSize.width / 2,
        height: imageSize.height / 2,
    });
    const [renderedPosition, setRenderedPosition] = useState({
        x: 170,
        y: 100,
    });

    const pillowAreaRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { startUpload } = useUploadThing('imageUploader');

    const saveConfiguration = async () => {
        try {
            const {
                left: areaLeft,
                top: areaTop,
                width,
                height,
            } = pillowAreaRef.current!.getBoundingClientRect();
            const { left: containerLeft, top: containerTop } =
                containerRef.current!.getBoundingClientRect();

            const leftOffset = areaLeft - containerLeft;
            const topOffset = areaTop - containerTop;

            const actualX = renderedPosition.x - leftOffset;
            const actualY = renderedPosition.y - topOffset;

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            const userImage = new Image();
            userImage.crossOrigin = 'anonymous';
            userImage.src = imageUrl;
            await new Promise((resolve) => (userImage.onload = resolve));

            ctx?.drawImage(
                userImage,
                actualX,
                actualY,
                renderedDimension.width,
                renderedDimension.height
            );

            const base64 = canvas.toDataURL().split(',')[1];

            const blob = base64ToBlob(base64, 'image/png');
            const file = new File([blob], 'filename.png', {
                type: 'image/png',
            });

            await startUpload([file], { configId });

            // containerRef.current?.append(canvas);
        } catch (err) {
            toast({
                title: 'Something went wrong',
                description:
                    'There was a problem savimg your config, please try again',
                variant: 'destructive',
            });
            console.log(err);
        }
    };

    const base64ToBlob = (base64: string, type: string) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        return new Blob([byteArray], { type });
    };

    const calcPrice = () => {
        return BASE_PRICE + options.filler.price + options.packaging.price;
    };

    return (
        <>
            <div className="relative mt-20 grid lg:grid-cols-3 grid-cols-1 lg:mb-20 mb-5">
                <div
                    ref={containerRef}
                    className="relative h-[600px] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none">
                    <div
                        ref={pillowAreaRef}
                        className="w-[65%] border-2 z-20 pointer-events-none border-red-400 shadow-[0_0_0_999px_rgba(229,231,235,0.6)] aspect-[1/1]"></div>
                    <Rnd
                        default={{
                            x: 170,
                            y: 100,
                            height: imageSize.height / 2,
                            width: imageSize.width / 2,
                        }}
                        onResizeStop={(_, __, ref, ___, { x, y }) => {
                            setRenderedDimension({
                                width: parseInt(ref.style.width.slice(0, -2)),
                                height: parseInt(ref.style.height.slice(0, -2)),
                            });
                            setRenderedPosition({ x, y });
                        }}
                        onDragStop={(_, data) => {
                            const { x, y } = data;
                            setRenderedPosition({ x, y });
                        }}
                        lockAspectRatio
                        className="absolute border-[2px] border-primary"
                        resizeHandleComponent={{
                            bottomRight: <HandleResizeComponent />,
                            bottomLeft: <HandleResizeComponent />,
                            topLeft: <HandleResizeComponent />,
                            topRight: <HandleResizeComponent />,
                        }}>
                        <div className="relative w-full h-full">
                            <NextImage
                                fill
                                src={imageUrl}
                                alt="your image"
                                className="pointer-events-none"
                            />
                        </div>
                    </Rnd>
                </div>

                <Dialog>
                    <DialogTrigger
                        className={buttonVariants({
                            className:
                                'absolute top-4 left-4 z-[40] font-bold cursor-pointer hover:text-white',
                        })}
                        asChild>
                        <Button variant="outline">View</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[800px] border-2 rounded-xl w-full h-[500px] p-0 m-0 overflow-hidden">
                        <PillowViewer userImageURL={imageUrl} />
                    </DialogContent>
                </Dialog>

                <div className="h-[600px] w-full col-span-full lg:col-span-1 flex flex-col">
                    <ScrollArea className="relative overflow-auto">
                        <div className="absolute z-10 inset-x-0 bottom-0 h-12" />
                        <div className="px-8 pb-12 pt-8">
                            <h2 className="tracking-tight font-bold text-3xl border-b border-zinc-200 pb-6">
                                Customize your pillow
                            </h2>

                            <div className="relative mt-4 h-full flex flex-col gap-6">
                                <div className="relative flex flex-col gap-3 w-full">
                                    <h3 className="font-semibold">
                                        {SIZES.name}
                                    </h3>
                                    <RadioGroup defaultValue="50x50">
                                        {SIZES.options.map((size) => (
                                            <div
                                                key={size.value}
                                                className="flex items-center">
                                                <RadioGroupItem
                                                    value={size.value}
                                                    id={size.value}
                                                    className="peer hidden"
                                                />
                                                <Label
                                                    onClick={() =>
                                                        setOptions((prev) => ({
                                                            ...prev,
                                                            size,
                                                        }))
                                                    }
                                                    htmlFor={size.value}
                                                    className="relative w-full cursor-pointer rounded-lg bg-white px-6 py-4 border-2 shadow-sm border-zinc-200 focus:outline-none outline-none peer-aria-checked:border-primary transition-all hover:bg-slate-50">
                                                    {size.label}
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <div className="relative flex flex-col gap-3 w-full">
                                    <h3 className="font-semibold">
                                        {FILLERS.name}
                                    </h3>
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
                                        <DropdownMenuContent className="w-full">
                                            {FILLERS.options.map((filler) => (
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
                                                            options.filler
                                                                .label &&
                                                            'bg-zinc-100'
                                                    )}
                                                    key={filler.value}>
                                                    <Check
                                                        className={cn(
                                                            'h-4 w-4 mr-2',
                                                            filler.label ===
                                                                options.filler
                                                                    .label
                                                                ? 'opacity-100'
                                                                : 'opacity-0'
                                                        )}
                                                    />
                                                    {filler.label}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                                <div className="relative flex flex-col gap-3 w-full">
                                    <h3 className="font-semibold">
                                        {PACKAGING.name}
                                    </h3>
                                    <RadioGroup defaultValue="standard">
                                        {PACKAGING.options.map((pack) => (
                                            <div
                                                key={pack.value}
                                                className="flex items-center">
                                                <RadioGroupItem
                                                    value={pack.value}
                                                    id={pack.value}
                                                    className="peer hidden"
                                                />
                                                <Label
                                                    onClick={() =>
                                                        setOptions((prev) => ({
                                                            ...prev,
                                                            packaging: pack,
                                                        }))
                                                    }
                                                    htmlFor={pack.value}
                                                    className="relative w-full cursor-pointer rounded-lg bg-white px-6 py-4 border-2 shadow-sm border-zinc-200 focus:outline-none outline-none peer-aria-checked:border-primary transition-all hover:bg-slate-50">
                                                    <div className="flex justify-between">
                                                        <span>
                                                            {pack.label}
                                                        </span>
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
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                    <div className="w-full px-8 h-20 bg-white flex items-center">
                        <div className="border-t border-1 border-zinc-200 w-full h-full flex gap-6 items-center">
                            <p className="font-medium whitespace-nowrap">
                                {formatPrice(calcPrice())}
                            </p>
                            <Button
                                onClick={() => {
                                    saveConfig({
                                        packaging: options.packaging.value,
                                        filler: options.filler.value,
                                        configId,
                                    });
                                }}
                                size="sm"
                                className="w-full">
                                Continue <ArrowRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DesignConfigurator;
