'use client';

import Image from 'next/image';
import { Rnd } from 'react-rnd';
import HandleResizeComponent from '../ui/HandleResizeComponent';

interface Props {
    configId: string;
    imageUrl: string;
    imageSize: { width: number; height: number };
}

const DesignConfigurator = ({ configId, imageUrl, imageSize }: Props) => {
    return (
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
        </div>
    );
};

export default DesignConfigurator;
