import bedrevLogo from "/bedrevLogo.svg";
import { Link } from "react-router-dom";

interface ErrorProps {
  error: string;
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="flex justify-center flex-col w-full h-[100vh] items-center leading-[30px] gap-8">
      <Link to={"/"} className="flex">
        <img className="w-[180px]" src={bedrevLogo} alt="companylogo" />
      </Link>
      <div className="sm:text-[18px] text-[14px]">
        <p className="text-center font-medium tracking-tight">
          Beklager, vi kunne ikke finne bedriften du leter etter :(
        </p>
        <p className="text-center font-bold tracking-wider">
          Feilmelding: {error}
        </p>
      </div>
    </div>
  );
};

export default Error;
