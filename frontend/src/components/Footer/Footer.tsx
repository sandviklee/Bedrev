import { Link } from "react-router-dom";
import classNames from "classnames";
import bedrevLogoWhite from "/bedrevLogoWhite.svg";

const buttonClass = classNames(
  "flex",
  "items-center",
  "justify-center",
  "align-center",
  "h-[100%]",
  "sm:w-[105px]",
  "w-[90px]",
);

const Footer = () => {
  return (
    <>
      <footer className="flex flex-row w-full sm:h-[180px] h-[120px] bg-purple items-center px-[8%] font-whyte">
        <Link to={`/`}>
          <div className="flex flex-row items-center justify-center gap-2">
            <img
              className="pt-2 sm:w-[150px] w-[100px]"
              src={bedrevLogoWhite}
              alt="companylogo"
            />
            <p className="sm:text-lg text-base text-white-paper pt-2">©2023</p>
          </div>
        </Link>
        <div className="flex flex-row h-full w-full pt-[6px] items-center justify-end sm:gap-1 text-white-paper sm:text-base text-sm">
          <Link to={`/`} className={buttonClass}>
            <p>Hjem</p>
          </Link>
          <Link to={`/sok-bedrifter`} className={buttonClass}>
            <p>Søk bedrifter</p>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
