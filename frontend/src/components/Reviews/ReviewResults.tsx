import { gql, useQuery } from "@apollo/client";
import Review from "./Review";
import { ReviewType } from "../../types/types";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { ratingState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";

interface ReviewResults {
  bedrift?: string;
}

const ReviewResults = ({ bedrift }: ReviewResults) => {
  const reviewsShown = 4;
  const rating = useRecoilState(ratingState); //Global State management.
  const [currentPage, setCurrentPage] = useState(1);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [reviewAmount, setReviewAmount] = useState(3);

  /**
   * Handles the dimentions of the current page
   */
  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  /**
   * Event listener for the page size.
   */
  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

  /**
   * Resets the page to the first page everytime
   * the search result is filtered.
   */
  const resetPage = () => {
    setCurrentPage(1);
  };

  useEffect(() => {
    resetPage();
  }, [rating[0]]);

  /**
   * Changes how many Reviews
   * should be queried at
   * different screen sizes.
   */
  useEffect(() => {
    const largeMonitorWidth = 1400;
    const middleMonitorWidth = 1000;
    const smallMonitorWidth = 750;
    setReviewAmount(
      dimensions.width > largeMonitorWidth
        ? reviewsShown
        : dimensions.width > middleMonitorWidth
        ? reviewsShown - 1
        : dimensions.width > smallMonitorWidth
        ? reviewsShown - 2
        : 1,
    );
    resetPage();
  }, [dimensions.width]);

  /**
   * Query for reviews given its filters and sort.
   */
  const REVIEW_QUERY = gql`
        {
            reviewSok(organisasjonsnummer: ${parseInt(
              bedrift || "0",
            )}, amount: ${reviewAmount} , skip: ${
              currentPage > 0 ? (currentPage - 1) * reviewAmount : 0
            } ${rating[0] ? `, rating: ${rating[0]}` : ""}) {
                title
                description
                rating
                id
            }
            reviewSokCount(organisasjonsnummer:  ${parseInt(bedrift || "0")} ${
              rating[0] ? `, rating: ${rating[0]}` : ""
            })
        }
    `;

  /**
   * Fetching of said query.
   */
  const { data, loading, error, refetch } = useQuery(REVIEW_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error.message}</pre>;

  /**
   * Function to update the current page.
   * @param event for handling page change events
   * @param value for getting the value from pagination
   */
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event;
    setCurrentPage(value);
    refetch();
  };

  return (
    <>
      <div className="sm:pt-6 pt-2 flex flex-row gap-4 sm:justify-start justify-center ">
        {data["reviewSok"].length > 0 ? (
          data["reviewSok"].map((review: ReviewType) => <Review {...review} />)
        ) : (
          <p className="sm:text-lg text-base pb-6">
            Denne bedrifter har ingen tilbakemeldinger enda med gitte filter,
            jobber du her?{" "}
            <span className="underline">Skriv en tilbakemelding</span>
          </p>
        )}
      </div>
      <div className="flex justify-center pt-8">
        <Pagination
          page={currentPage}
          onChange={handleChange}
          onClick={refetch}
          count={Math.ceil(data["reviewSokCount"] / reviewAmount)}
        />
      </div>
    </>
  );
};

export default ReviewResults;
