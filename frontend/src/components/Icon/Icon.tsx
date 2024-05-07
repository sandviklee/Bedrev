import {
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
  FiSquare,
  FiFilter,
  FiTrash2,
} from "react-icons/fi";

export type IconType =
  | "Search"
  | "RightArrow"
  | "LeftArrow"
  | "Square"
  | "Filter"
  | "Trash"
  | string;

interface IconProps {
  icon: IconType;
  iconColor?: "white";
}

const Icon = ({ icon, iconColor }: IconProps) => {
  return (
    <>
      <div style={{ color: !iconColor ? "black" : iconColor }}>
        {icon == "Search" && (
          <FiSearch className="text-4xl group-hover:-rotate-12 transition delay-75" />
        )}
        {icon == "RightArrow" && (
          <FiChevronRight className="text-4xl hover:translate-x-1 transition delay-75" />
        )}
        {icon == "LeftArrow" && (
          <FiChevronLeft className="text-4xl hover:-translate-x-1 transition delay-75" />
        )}
        {icon == "Square" && (
          <FiSquare className="text-[9px] bg-purple rounded-sm" />
        )}
        {icon == "Filter" && <FiFilter className="sm:text-2xl text-[18px]" />}
        {icon == "Trash" && <FiTrash2 className="text-2xl" />}
      </div>
    </>
  );
};

export default Icon;
