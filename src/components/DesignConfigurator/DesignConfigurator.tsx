'use client';

import NextImage from 'next/image';
import { Rnd } from 'react-rnd';
import HandleResizeComponent from '../ui/HandleResizeComponent';
import PillowViewer from '../PillowViewer';
import { Button, buttonVariants } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { useRef, useState } from 'react';
import { base64ToBlob } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useUploadThing } from '@/lib/uploadthing';
import { useMutation } from '@tanstack/react-query';
import 'react-loading-skeleton/dist/skeleton.css';
import {
    saveConfig as _saveConfig,
    SaveConfigArgs,
} from '@/app/configure/design/actions';
import { Options } from './types';
import PriceConfigurator from './PriceConfigurator';

interface Props {
    configId: string;
    imageUrl: string;
    imageSize: { width: number; height: number };
}

const DesignConfigurator = ({ configId, imageUrl, imageSize }: Props) => {
    const { toast } = useToast();
    const [options, setOptions] = useState<Options>({
        filler: null,
        size: null,
        packaging: null,
    });

    const { mutate: saveConfig, isPending } = useMutation({
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
                    <DialogContent className="max-w-[800px] h-[500px] border-2 rounded-xl p-0 m-0">
                        <PillowViewer userImageURL={imageUrl} />
                    </DialogContent>
                </Dialog>

                <PriceConfigurator
                    options={options}
                    setOptions={setOptions}
                    saveConfig={saveConfig}
                    configId={configId}
                    isPending={isPending}
                />
            </div>
        </>
    );
};

export default DesignConfigurator;