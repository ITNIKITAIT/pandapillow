import Image from 'next/image';
import Container from '../Container';
import ReviewGrid from './ReviewGrid';

const Reviews = () => {
    return (
        <Container className="relative">
            <ReviewGrid />

            <Image
                src="/what-people-are-buying.png"
                className="absolute hidden left-0 top-[200px] -translate-x-2/3 xl:block"
                alt="buy"
                width={180}
                height={180}
            />
        </Container>
    );
};

export default Reviews;
