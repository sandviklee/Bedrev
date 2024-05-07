import { FiUser, FiStar } from "react-icons/fi";
import { ReviewType } from "../../types/types";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import { ReviewJSON } from "../../types/types";

const Review = ({ title, rating, description, id }: ReviewType) => {
  const authToken = localStorage.getItem("auth-token"); //Global state management.
  const [reviewId, setReviewId] = useState<number | null>(null);
  const navigate = useNavigate();

  /**
   * Query for getting all the reviews
   * the user has.
   */
  const USER_QUERY = gql`
    query {
      me {
        reviews {
          id
        }
      }
    }
  `;

  const DELETE_MUTATION = gql`
        mutation {
            deleteReview(id: ${reviewId})
        }
    `;

  const [deleteReview] = useMutation(DELETE_MUTATION, {
    onCompleted: () => {
      navigate(0);
    },
    context: { headers: { authorization: `Bearer ${authToken}` } },
  });

  const { data } = useQuery(USER_QUERY, {
    fetchPolicy: "cache-first", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
    context: { headers: { authorization: `Bearer ${authToken}` } },
  });

  /**
   * Use effect for checking if the review
   * is made by the authorized user
   * and if so, sets the review id.
   */
  useEffect(() => {
    setReviewId(null);
    if (data !== undefined) {
      data["me"]["reviews"].map((review: ReviewJSON) => {
        if (review["id"] == id) {
          setReviewId(review.id);
        }
      });
    }
  }, [data, title]);

  return (
    <>
      <div
        style={{ backgroundColor: reviewId ? "#C4A8F4" : "#E2DAEB" }}
        className="px-[20px] py-[20px] flex-row sm:h-fit max-h-fit min-h-[200px] w-[350px] rounded-md font-whyte"
      >
        <div className="flex">
          <p className="flex w-full justify-start leading-[40px] text-[90%] font-medium ">
            {title}
          </p>
          {reviewId && (
            <button onClick={() => deleteReview()} className="flex justify-end">
              <Icon icon="Trash" />
            </button>
          )}
        </div>

        <div className="flex items-center align-middle gap-1 py-2">
          <div className="text-2xl pb-2">
            <FiStar />
          </div>
          <p className="text-lg font-medium">{rating}/5</p>
        </div>
        <p className="leading-[30px] font-regular text-[16px] sm:h-[120px] max-h-[180px] min-h-[160px]">
          {description}
        </p>
        <p className="flex gap-1 py-2 justify-end text-base font-medium items-center ">
          <div className="text-2xl pb-1">
            <FiUser />
          </div>
          <p>Anonym</p>
        </p>
      </div>
    </>
  );
};

export default Review;
