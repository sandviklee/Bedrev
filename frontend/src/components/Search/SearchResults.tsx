import { gql, useQuery } from "@apollo/client";
import { Company } from "../../types/types";
import CompanyCard from "../Company/CompanyCard";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import {
  minValueState,
  placeState,
  maxValueState,
  searchState,
  sortState,
} from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { useDebounce } from "use-debounce";

const SearchResults = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const place = useRecoilState<string>(placeState);
  const searchValue = useRecoilState<string>(searchState);
  const minValue = useRecoilState<string>(minValueState);
  const maxValue = useRecoilState<string>(maxValueState);
  const sort = useRecoilState<string>(sortState);
  const [minDebounced] = useDebounce(minValue[0], 500);
  const [maxDebounced] = useDebounce(maxValue[0], 500);
  const [searchDebounced] = useDebounce(searchValue[0], 500);

  /**
   * Updates the session storage.
   */
  useEffect(() => {
    sessionStorage.setItem("minValue", minDebounced);
    sessionStorage.setItem("maxValue", maxDebounced);
    sessionStorage.setItem("sort", sort[0]);
    sessionStorage.setItem("place", place[0]);
    sessionStorage.setItem("search", searchDebounced);
  }, [minDebounced, maxDebounced, sort[0], searchDebounced, place[0]]);

  const BEDRIFT_QUERY_SEARCH = gql`
        {
            bedriftSok(skip: ${
              currentPage > 0 ? (currentPage - 1) * 5 : 0
            }, navn: "${searchDebounced
              .toLowerCase()
              .trim()}", lavest:${parseInt(minDebounced)}, hoyest:${parseInt(
              maxDebounced,
            )}, postadresse_poststed: "${place[0].toUpperCase()}", sort: "${
              sort[0]
            }") {
                navn
                postadresse_kommune
                antallansatte
                vedtektsfestetformaal
                organisasjonsnummer
            }
            bedriftSokCount(navn: "${searchDebounced
              .toLowerCase()
              .trim()}", lavest:${parseInt(minDebounced)}, hoyest:${parseInt(
              maxDebounced,
            )}, postadresse_poststed: "${place[0].toUpperCase()}")
        }
    `;

  const { data, loading, error } = useQuery(BEDRIFT_QUERY_SEARCH, {
    fetchPolicy: "cache-first", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  /**
   * Handler for the pagination component.
   * @param event change of page
   * @param value is the current page value
   */
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setCurrentPage(value);
  };

  /**
   * Resets the page to the first page everytime
   * the search result is filtered.
   */
  const resetPage = () => {
    setCurrentPage(1);
  };
  useEffect(() => {
    resetPage();
  }, [searchValue[0], minDebounced, maxDebounced, place[0]]);

  if (loading)
    return <p className="text-left text-lg">Laster inn flere bedrifter...</p>;
  if (error)
    return (
      <>
        <div className="leading-[30px] py-[20px]">
          <p className="font-medium tracking-tight">
            Beklager, vi klarer ikke å laste inn noen bedrifter akkurat nå, prøv
            igjen senere :(
          </p>
          <p className="font-bold tracking-wider">
            Feilmelding: {error.message}
          </p>
        </div>
      </>
    );

  return (
    <>
      <p className="font-inter tracking-wide sm:text-[14px] text-[12px] ">
        Fant {data["bedriftSokCount"]} bedrifter med valgte filter
      </p>
      <div className="flex flex-col sm:gap-1 gap-3 mt-4">
        {data["bedriftSok"].map((company: Company) => (
          <Link key={company.navn} to={String(company.organisasjonsnummer)}>
            <CompanyCard {...company} />
          </Link>
        ))}
      </div>
      <div className="flex justify-center pt-8">
        <Pagination
          page={currentPage}
          onChange={handleChange}
          count={Math.ceil(data["bedriftSokCount"] / 5)}
        />
      </div>
    </>
  );
};

export default SearchResults;
