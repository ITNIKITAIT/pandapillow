import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Dashboard from '@/components/Dashboard';

const Page = async () => {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user.role === 'ADMIN';

    if (!isAdmin) {
        return redirect('/');
    }

    return <Dashboard />;
};

export default Page;
