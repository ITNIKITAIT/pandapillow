import Link from 'next/link';
import Container from './Container';

const Footer = () => {
    return (
        <footer className="bg-white relative">
            <Container>
                <div className="border-t py-7 border-gray-200">
                    <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
                        <p className="text-sm text-muted-foreground pb-2 md:pb-0">
                            &copy; {new Date().getFullYear()} All rights
                            reserved
                        </p>

                        <div className="flex items-center justify-center">
                            <div className="flex space-x-8">
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-gray-600">
                                    Terms
                                </Link>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-gray-600">
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground hover:text-gray-600">
                                    Cookie Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;