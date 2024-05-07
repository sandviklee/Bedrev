import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Radiobutton from "../components/Input/Radiobutton/Radiobutton";
import Field from "../components/Input/Field/Field";
import * as Form from "@radix-ui/react-form";
import bedrevIcon from "/bedrevIcon.svg";
import SearchResults from "../components/Search/SearchResults";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Icon from "../components/Icon/Icon";
import {
  placeState,
  searchState,
  minValueState,
  maxValueState,
  sortState,
} from "../atoms/atoms";
import { useRecoilState } from "recoil";

const BedriftSokPage = () => {
  // All "useRecoilStates" refer to the atoms (Global state management)
  const [searchValue, setSearchValue] = useRecoilState<string>(searchState);
  const [minValue, setMinValue] = useRecoilState<string>(minValueState);
  const [maxValue, setMaxValue] = useRecoilState<string>(maxValueState);
  const [place, setPlace] = useRecoilState(placeState);
  const [sort, setSort] = useRecoilState<string>(sortState);

  /**
   * Updates the sort global value.
   * @param event for when a new sort has been chosen.
   */
  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>bedrev | Bedriftssøk</title>
        <link rel="icon" type="image/svg+xml" href={bedrevIcon} />
      </Helmet>
      <Navbar page="Søk bedrifter" />

      <div className="overflow-hidden px-[8%] flex flex-col sm:flex-row mb-20 sm:gap-0 gap-4">
        <div className="w-full sm:w-fit sm:h-fit  h-[300px] p-6 bg-purple-lighter rounded-md">
          <h3 className="font-whyte font-semibold text-xl">Filtre</h3>
          <div className="flex flex-col gap-6 mt-4">
            <p className="font-whyte text-lg mb-[-20px]">Område</p>
            <div className="flex flex-row flex-wrap sm:flex-col gap-[12px] sm:gap-[3px]">
              <Radiobutton
                value={String(place)}
                setValue={setPlace}
                label="Bergen"
              />
              <Radiobutton
                value={String(place)}
                setValue={setPlace}
                label="Oslo"
              />
              <Radiobutton
                value={String(place)}
                setValue={setPlace}
                label="Trondheim"
              />
              <Radiobutton
                value={String(place)}
                setValue={setPlace}
                label="Bodø"
              />
            </div>
            <p className="font-whyte text-lg mb-[-20px]">Ansatte</p>
            <div className="flex flex-row flex-wrap sm:flex-col gap-[12px] sm:gap-[3px]">
              <Form.Root className="flex sm:flex-col gap-4">
                <Field
                  name="Min Salary"
                  label="Min"
                  type="number"
                  border={false}
                  direction="col"
                  placeholder="Min"
                  background="purple-light"
                  value={minValue}
                  setValue={setMinValue}
                />
                <Field
                  name="Max Salary"
                  label="Maks"
                  type="number"
                  border={false}
                  direction="col"
                  placeholder="Max"
                  background="purple-light"
                  value={maxValue}
                  setValue={setMaxValue}
                />
              </Form.Root>
            </div>
          </div>
        </div>
        <div className="flex-1 sm:ml-8">
          <Form.Root className="flex flex-col gap-1">
            <Field
              name="bedriftsok"
              type="search"
              border={true}
              direction="col"
              placeholder="Søk etter en bedrift..."
              background="white"
              value={searchValue}
              setValue={setSearchValue}
            />
          </Form.Root>
          <div className="w-full flex flex-row justify-between items-center">
            <div>
              <p className="font-whyte sm:text-lg text-[14px] sm:w-[400px] w-[100px] font-medium mt-6">
                Søk bedrifter
              </p>
            </div>
            <div className="flex gap-2 align-middle items-center sm:px-[40px]">
              <Icon icon="Filter" />
              <p className="mt-1 text-[12px] sm:text-base sm:w-[100px] justify-end">
                Sorter etter{" "}
              </p>
              <FormControl className="border-none sm:w-[120px] pt-1">
                <Select
                  disableUnderline
                  variant="standard"
                  className="font-bold w-fit sm:text-sm text-[12px]"
                  value={sort}
                  label="Sort"
                  onChange={handleChange}
                >
                  <MenuItem className="sm:text-sm text-[12px]" value={"asc"}>
                    Bedriftnavn A til Z
                  </MenuItem>
                  <MenuItem className="sm:text-sm text-[12px]" value={"desc"}>
                    Bedriftnavn Z til A
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="min-h-[600px]">
            <SearchResults />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BedriftSokPage;
