import Image from 'next/image';

const Review = ({ imgSrc }: { imgSrc: string }) => {
    return (
        <div className="animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5">
            <Image height={500} width={500} src={imgSrc} alt="review" />
        </div>
    );
};

export default Review;
