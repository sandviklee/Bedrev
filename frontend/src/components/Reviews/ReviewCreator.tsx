import Button from "../Buttons/Button";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as Form from "@radix-ui/react-form";
import Field from "../Input/Field/Field";
import { FiXCircle } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import styles from "./ReviewCreator.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, gql } from "@apollo/client";
import { ReviewJSON } from "../../types/types";
interface ReviewCreatorProps {
  workplace?: string;
  bedriftOrgNr: string;
}

const ReviewCreator = ({ workplace, bedriftOrgNr }: ReviewCreatorProps) => {
  const maxTitleWords = 30;
  const maxDescriptionWords = 100;
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [userId, setUserId] = useState<number>(0);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [maxTitle, setMaxTitle] = useState<number>(maxTitleWords);
  const [maxDescription, setMaxDescription] =
    useState<number>(maxDescriptionWords);
  const authToken = localStorage.getItem("auth-token");
  const navigate = useNavigate();

  const USER_QUERY = gql`
    query {
      me {
        id
        reviews {
          postedBy {
            reviews {
              bedrift {
                organisasjonsnummer
              }
            }
          }
        }
      }
    }
  `;

  /**
   * Fetches data given above from the user query.
   * Sends the header with authorization token.
   */
  const { data, loading, error } = useQuery(USER_QUERY, {
    fetchPolicy: "cache-first", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
    context: { headers: { authorization: `Bearer ${authToken}` } },
  });

  /**
   * Checks if the user has written any
   * reviews for this company. If so,
   * it should disable the button.
   */
  useEffect(() => {
    if (data !== undefined) {
      setUserId(data["me"]["id"]);
      const map = data["me"]["reviews"].map((review: ReviewJSON) =>
        review["postedBy"]["reviews"].map(
          (companyReview: ReviewJSON) =>
            companyReview["bedrift"]["organisasjonsnummer"] ==
            parseInt(bedriftOrgNr),
        ),
      );
      if (map.length > 0) {
        setDisableButton(map[0].includes(true));
      }
    }
  }, [data]);

  /**
   * Updates the max title for each field.
   */
  useEffect(() => {
    setMaxTitle(maxTitleWords - title.length);
    setMaxDescription(maxDescriptionWords - description.length);
  }, [title, description]);

  const REVIEW_MUTATION = gql`
        mutation {
            createReview(
                title: "${title}"
                description: "${description}"
                rating: ${rating}
                bedriftOrgNr:${parseInt(bedriftOrgNr)}
                postedById: ${userId}
            ) {
                review {
                    id
                }
            }
        }
    `;

  const [createReview] = useMutation(REVIEW_MUTATION, {
    onCompleted: () => {
      setErrorMessage("");
      resetFields();
      navigate(0);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setRating(1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <pre>{error.message}</pre>;

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <Button
            text={"Skriv en tilbakemelding"}
            flex
            disabled={disableButton}
            icon="Edit"
            px="[10px]"
          />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className={styles.AlertDialogOverlay} />
          <AlertDialog.Content className={styles.AlertDialogContent}>
            <AlertDialog.Title>
              <div className="flex flex-row w-full items-center">
                <p className="w-[1400px] sm:font-medium sm:text-base text-sm">
                  Skriv en tilbakemelding til {workplace}
                </p>
                <div className=" justify-end flex">
                  <AlertDialog.Cancel asChild>
                    <button
                      className="text-xl text-purple px-2 py-1"
                      onClick={() => resetFields()}
                    >
                      <FiXCircle />
                    </button>
                  </AlertDialog.Cancel>
                </div>
              </div>
            </AlertDialog.Title>

            <Form.Root
              className="w-full mt-[20px] flex flex-col gap-4"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <Field
                name="Tittel"
                placeholder="Skriv en tittel her..."
                type="text"
                maxnumber={maxTitle}
                direction="col"
                label="Tittel"
                required
                border
                value={title}
                setValue={setTitle}
              />
              <Field
                name="Tilbakemelding"
                placeholder="Skriv en tilbakemelding her..."
                type="textarea"
                maxnumber={maxDescription}
                border
                direction="col"
                label="Tilbakemelding"
                required
                value={description}
                setValue={setDescription}
              />
            </Form.Root>
            {errorMessage !== "" && (
              <p className="text-base text-red">{errorMessage}</p>
            )}
            <div className="absolute">
              <p className="font-medium sm:py-[5px] py-[5px]">
                Gi en vurdering
              </p>
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue as 1 | 2 | 3 | 4 | 5);
                }}
              />
            </div>

            <div className="flex justify-end pt-[4%]">
              <Button
                text="Send inn"
                icon="ArrowRight"
                flex
                px="[4%]"
                onClick={() => createReview()}
              />
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
};

export default ReviewCreator;
