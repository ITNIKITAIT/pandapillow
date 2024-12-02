import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { z } from 'zod';
import sharp from 'sharp';
import prisma from '../../../../prisma/db';

const f = createUploadthing();

export const ourFileRouter = {
    imageUploader: f({ image: { maxFileSize: '8MB' } })
        .input(z.object({ configId: z.string().optional() }))
        .middleware(async ({ input }) => {
            return { input };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            const { configId } = metadata.input;

            const res = await fetch(file.url);
            const buffer = await res.arrayBuffer();

            const { width, height } = await sharp(buffer).metadata();

            if (!configId) {
                const configuration = await prisma.configuration.create({
                    data: {
                        width: width || 500,
                        height: height || 500,
                        imageUrl: file.url,
                    },
                });
                return { configId: configuration.id };
            } else {
                const updatedConfiguration = await prisma.configuration.update({
                    where: {
                        id: configId,
                    },
                    data: {
                        croppedImageUrl: file.url,
                    },
                });

                return { configId: updatedConfiguration.id };
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
