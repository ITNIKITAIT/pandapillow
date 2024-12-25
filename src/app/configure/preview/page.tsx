import { SearchParamsI } from '@/app/types';
import { notFound } from 'next/navigation';
import prisma from '../../../../prisma/db';
import DesignPreview from '@/components/DesignPreview/DesignPreview';

const Page = async ({ searchParams }: SearchParamsI) => {
    const { id } = searchParams;
    if (!id || typeof id !== 'string') {
        return notFound();
    }

    const configuration = await prisma.configuration.findUnique({
        where: {
            id,
        },
        include: {
            pillowFiller: true,
            pillowPackaging: true,
            pillowSize: true,
        },
    });

    if (!configuration) {
        return notFound();
    }

    return <DesignPreview configuration={configuration} />;
};

export default Page;
