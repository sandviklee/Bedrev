import classNames from "classnames";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FiPenTool } from "react-icons/fi";

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  icon?: "ArrowRight" | "Edit";
  flex?: boolean;
  px?: string;
}

const Button = ({
  text,
  type,
  onClick,
  disabled = false,
  icon,
  flex = false,
  px,
}: ButtonProps) => {
  const buttonClasses = classNames(
    !disabled ? "bg-white" : "bg-white-paper",
    !disabled ? "text-black" : "text-gray",
    !disabled ? "hover:bg-white" : null,
    !disabled ? "hover:text-black" : null,
    "rounded-sm",
    "border-black",
    "border-2",
    "transition-all",
    "py-2",
    flex ? "w-fit" : "w-full",
    "text-sm",
    `px-${px}`,
    "group",
    "transition",
    "hover:bg-primary",
    "border-solid",
  );

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonClasses}
      disabled={disabled}
    >
      <div className="flex flex-row gap-2 justify-center pt-1 h-full px-6 align-middle">
        {text}
        {icon == "ArrowRight" && (
          <AiOutlineArrowRight className="text-lg group-hover:translate-x-2 transition-transform delay-75 pb-1" />
        )}
        {icon == "Edit" && (
          <FiPenTool className="text-lg group-hover:-rotate-90 transition-all delay-75 pb-1" />
        )}
      </div>
    </button>
  );
};

export default Button;
