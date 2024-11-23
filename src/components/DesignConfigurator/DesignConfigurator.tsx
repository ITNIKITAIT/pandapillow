'use client';

import Image from 'next/image';
import { Rnd } from 'react-rnd';
import HandleResizeComponent from '../ui/HandleResizeComponent';
import PillowViewer from '../PillowViewer';
import { Button, buttonVariants } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';

interface Props {
    configId: string;
    imageUrl: string;
    imageSize: { width: number; height: number };
}

const DesignConfigurator = ({ configId, imageUrl, imageSize }: Props) => {
    console.log(configId);
    return (
        <>
            <div className="relative mt-20 grid grid-cols-3 mb-20">
                <div className="relative h-[600px] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none">
                    <div className="w-[65%] border-2 z-20 pointer-events-none border-red-400 shadow-[0_0_0_999px_rgba(229,231,235,0.6)] aspect-[1/1]"></div>
                    <Rnd
                        default={{
                            x: 170,
                            y: 100,
                            height: imageSize.height / 2,
                            width: imageSize.width / 2,
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
                            <Image
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
            </div>
        </>
    );
};

export default DesignConfigurator;
