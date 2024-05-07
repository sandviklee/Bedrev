import {
  FiUsers,
  FiMapPin,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
  FiGlobe,
} from "react-icons/fi";

interface KeyPointProps {
  keypointName: string;
  keypointIcon:
    | "Workers"
    | "Sallary"
    | "Trending"
    | "HQ"
    | "Calendar"
    | "Globe";
}

const KeyPoint = ({ keypointName, keypointIcon }: KeyPointProps) => {
  return (
    <>
      <div className="flex-col">
        <div className="flex justify-center text-purple text-5xl">
          {keypointIcon == "Workers" && <FiUsers />}
          {keypointIcon == "HQ" && <FiMapPin />}
          {keypointIcon == "Trending" && <FiTrendingUp />}
          {keypointIcon == "Sallary" && <FiDollarSign />}
          {keypointIcon == "Calendar" && <FiCalendar />}
          {keypointIcon == "Globe" && <FiGlobe />}
        </div>
        <div className="flex justify-center text-purple sm:text-lg text-base pt-2 font-medium">
          <p>{keypointName}</p>
        </div>
      </div>
    </>
  );
};

export default KeyPoint;
