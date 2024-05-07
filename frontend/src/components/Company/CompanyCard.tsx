import { Company } from "../../types/types";
import usersIcon from "/icons/users.svg";
import briefcaseIcon from "/icons/briefcase.svg";
import globeIcon from "/icons/globe.svg";

const CompanyCard = (company: Company) => {
  return (
    <div className="w-full flex flex-row rounded-md overflow-hidden">
      <div className="w-full px-[2%] py-[2%] flex-row bg-purple-lighter border-purple border-2 rounded-r-md">
        <p className="sm:leading-[40px] leading-[25px] sm:text-lg text-[12px] sm:font-medium font-bold font-whyte mb-[-6px]">
          {company.navn.toUpperCase()}
        </p>
        <p className="truncate sm:leading-[30px] sm:text-sm text-[12px] font-inter max-w-[700px] h-[70px]">
          {company.vedtektsfestetformaal}
        </p>
        <div className="hidden lg:flex flex-row gap-[5%] mt-2">
          <div className="flex flex-row gap-2 items-center">
            <img alt="employees" src={usersIcon} />
            {company.antallansatte}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <img alt="employees" src={briefcaseIcon} />
            {"Bedrift"}
          </div>
          <div className="flex flex-row gap-2 items-center">
            <img alt="employees" src={globeIcon} />
            {company.postadresse_kommune}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
