import { notFound } from 'next/navigation';
import prisma from '../../../../prisma/db';
import DesignConfigurator from '@/components/DesignConfigurator/DesignConfigurator';
import { SearchParamsI } from '@/app/types';

const Page = async ({ searchParams }: SearchParamsI) => {
    const { id } = searchParams;

    if (!id || typeof id !== 'string') {
        return notFound();
    }

    const configuration = await prisma.configuration.findUnique({
        where: {
            id,
        },
    });

    if (!configuration) {
        return notFound();
    }

    const { imageUrl, width, height } = configuration;

    return (
        <DesignConfigurator
            imageUrl={imageUrl}
            imageSize={{ width, height }}
            configId={id}
        />
    );
};

export default Page;
