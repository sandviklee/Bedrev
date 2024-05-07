import { Link, useNavigate, useLocation } from "react-router-dom";
import classNames from "classnames";
import Dropdown from "./DropdownMenu";
import bedrevLogo from "/bedrevLogo.svg";
import { useEffect, useState } from "react";
import { NavbarData } from "../../types/types";

/**
 * Dot component placed beside the
 * clicked navbar button (page).
 * @returns TSX component
 */
const Dot = () => {
  return (
    <>
      <div className="w-2 h-2 rounded-xl bg-purple"></div>
    </>
  );
};

interface NavbarProps {
  page?: "Hjem" | "Søk bedrifter" | "Logg Inn";
}

const navbarLinks = [
  {
    title: "Hjem",
    link: "/",
  },
  {
    title: "Søk bedrifter",
    link: "/sok-bedrifter",
  },
];

const buttonClass = classNames(
  "flex",
  "items-center",
  "justify-center",
  "h-[100%]",
  "w-[120px]",
  "font-whyte",
);

const Navbar = ({ page }: NavbarProps) => {
  const [authToken, setAuthToken] = useState<string | null>(
    localStorage.getItem("auth-token"),
  );
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setAuthToken(localStorage.getItem("auth-token"));
  }, [location.state]);

  return (
    <nav className="flex flex-row w-full h-[120px] items-center px-[8%] text-base font-whyte">
      <Link to={`/`}>
        <img className="w-[150px]" src={bedrevLogo} alt="companylogo" />
      </Link>
      <div className="sm:visible sm:flex flex-row h-full w-full items-center justify-end hidden">
        {navbarLinks.map((data: NavbarData) => (
          <Link key={data.title} to={data.link} className={buttonClass}>
            <div
              className="pb-1.5 pr-2"
              style={{
                visibility: page == `${data.title}` ? "visible" : "hidden",
              }}
            >
              <Dot />
            </div>
            <p>{data.title}</p>
          </Link>
        ))}
        {authToken == null ? (
          <Link to={"/logg-inn"} className={buttonClass}>
            <div
              className="pb-1.5 pr-2"
              style={{
                visibility: page == `Logg Inn` ? "visible" : "hidden",
              }}
            >
              <Dot />
            </div>
            <p>Logg Inn</p>
          </Link>
        ) : (
          <Link
            to={"/"}
            onClick={async () => {
              await localStorage.removeItem("auth-token");
              navigate(-1);
            }}
            className={buttonClass}
          >
            <div
              className="pb-1.5 pr-2"
              style={{
                visibility: page == `Logg Inn` ? "visible" : "hidden",
              }}
            >
              <Dot />
            </div>
            <p>Logg ut</p>
          </Link>
        )}
      </div>
      <div className="sm:hidden flex w-full h-full items-center justify-end visible pb-4">
        <Dropdown />
      </div>
    </nav>
  );
};

export default Navbar;
