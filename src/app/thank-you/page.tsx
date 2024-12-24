import ThankYou from '@/components/ThankYou/ThankYou';
import { Suspense } from 'react';

const Page = () => {
    return (
        <Suspense>
            <ThankYou />
        </Suspense>
    );
};

export default Page;
