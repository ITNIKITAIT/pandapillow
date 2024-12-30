import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Dashboard from '@/components/Dashboard';
import { authOptions } from '@/auth-options';

const Page = async () => {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user.role === 'ADMIN';

    if (!isAdmin) {
        return redirect('/');
    }

    return <Dashboard />;
};

export default Page;
