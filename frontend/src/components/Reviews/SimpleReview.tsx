interface SimpleReviewProps {
  title: string;
  desc: string;
  workplace: string;
}

const SimpleReview = ({ title, desc, workplace }: SimpleReviewProps) => {
  return (
    <>
      <div className="px-[20px] py-[20px] flex-row h-[250px] w-[350px] bg-purple-light rounded-md font-whyte">
        <p className="sm:leading-[40px] leading-[25px] text-lg font-medium">
          {title}
        </p>
        <p className="leading-[30px] text-sm  h-[140px]">{desc}</p>
        <p className="py-2 h-full w-full text-end text-base font-medium">
          Anonym om {workplace}
        </p>
      </div>
    </>
  );
};

export default SimpleReview;
