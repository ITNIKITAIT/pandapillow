import Container from '@/components/Container';
import Steps from '@/components/Steps';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <Container className="flex-1 flex flex-col">
            <Steps />
            {children}
        </Container>
    );
};

export default Layout;
