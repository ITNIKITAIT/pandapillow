'use client';

import Dropzone, { FileRejection } from 'react-dropzone';
import { useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { ImagePlus, Loader2, MousePointerSquareDashed } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useUploadThing } from '@/lib/uploadthing';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const Page = () => {
    const { toast } = useToast();
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const { startUpload, isUploading } = useUploadThing('imageUploader', {
        onClientUploadComplete: ([data]) => {
            const configId = data.serverData.configId;
            console.log('configId === ' + configId);
            startTransition(() => {
                router.push(`/configure/design?id=${configId}`);
            });
        },
        onUploadProgress(p) {
            setUploadProgress(p);
        },
    });

    const onDropRejected = (rejectedFiles: FileRejection[]) => {
        const [file] = rejectedFiles;
        setIsDragOver(false);

        toast({
            title: `${file.file.type} type is not supported.`,
            description: 'Please choose a PNG, JPG, JPEG image instead.',
            variant: 'destructive',
        });
    };
    const onDropAccepted = (acceptedFiles: File[]) => {
        startUpload(acceptedFiles, { configId: undefined });

        setIsDragOver(false);
    };

    return (
        <div
            className={cn(
                'relative my-10 bg-gray-900/5 w-full ring-1 ring-inset ring-gray-900/10 rounded-xl flex flex-1 justify-center flex-col items-center',
                isDragOver && 'ring-blue-900/25 bg-blue-900/10'
            )}>
            <div className="relative flex flex-1 flex-col items-center justify-center w-full h-full">
                <Dropzone
                    onDropRejected={onDropRejected}
                    onDropAccepted={onDropAccepted}
                    accept={{
                        'image/png': ['.png'],
                        'image/jpeg': ['.jpeg'],
                        'image/jpg': ['.jpg'],
                    }}
                    onDragEnter={() => setIsDragOver(true)}
                    onDragLeave={() => setIsDragOver(false)}>
                    {({ getRootProps, getInputProps }) => (
                        <section
                            className="h-full w-full flex flex-col flex-1 justify-center items-center"
                            {...getRootProps()}>
                            <input {...getInputProps()} />
                            {isDragOver ? (
                                <MousePointerSquareDashed className="h-6 w-6 text-zinx-500 mb-2" />
                            ) : isUploading || isPending ? (
                                <Loader2 className="h-6 w-6 text-zinc-500 mb-2 animate-spin" />
                            ) : (
                                <ImagePlus className="h-6 w-6 text-zinc-500 mb-2" />
                            )}
                            <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                                {isUploading ? (
                                    <div className="flex flex-col items-center">
                                        <p>Uploading...</p>
                                        <Progress
                                            value={uploadProgress}
                                            className="mt-2 w-40 h-2 bg-gray-300"
                                        />
                                    </div>
                                ) : isPending ? (
                                    <div className="flex flex-col items-center">
                                        <p>Redirecting, please wait...</p>
                                    </div>
                                ) : isDragOver ? (
                                    <p>
                                        <span className="font-semibold">
                                            Drop file{' '}
                                        </span>
                                        to upload
                                    </p>
                                ) : (
                                    <p>
                                        <span className="font-semibold">
                                            Click to upload{' '}
                                        </span>
                                        or drag and drop
                                    </p>
                                )}
                            </div>

                            {!isPending && (
                                <p className="text-xs text-zinc-500">
                                    PNG, JPG, JPEG
                                </p>
                            )}
                        </section>
                    )}
                </Dropzone>
            </div>
        </div>
    );
};

export default Page;
