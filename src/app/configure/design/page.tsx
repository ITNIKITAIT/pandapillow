import { notFound } from 'next/navigation';
import prisma from '../../../../prisma/db';
import DesignConfigurator from '@/components/DesignConfigurator/DesignConfigurator';

interface Props {
    searchParams: { [key: string]: string | string[] | undefined };
}

const Page = async ({ searchParams }: Props) => {
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
