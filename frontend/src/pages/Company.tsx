import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Gallery from "../components/Gallery/Gallery";
import ReviewResults from "../components/Reviews/ReviewResults";
import ReviewCreator from "../components/Reviews/ReviewCreator";
import mockImages from "../assets/mock/Images";
import { Link, useParams } from "react-router-dom";
import bedrevIcon from "/bedrevIcon.svg";
import { useQuery, gql } from "@apollo/client";
import KeyPoint from "../components/Icon/KeyPoint";
import Button from "../components/Buttons/Button";
import Rating from "@mui/material/Rating";
import Error from "./Error";
import Icon from "../components/Icon/Icon";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import { ratingState } from "../atoms/atoms";
import { useRecoilState } from "recoil";

const Company = () => {
  const { bedrift } = useParams(); // This is the org nr
  const [rating, setRating] = useRecoilState<number>(ratingState); //Global rating state.
  const authToken = localStorage.getItem("auth-token");

  const BEDRIFT_QUERY = gql`
        {
            bedriftByOrgNr(organisasjonsnummer: ${parseInt(
              bedrift ? bedrift : "",
            )}) {
                antallansatte
                naeringskode_beskrivelse
                navn
                organisasjonsnummer
                postadresse_adresse
                postadresse_kommune
                postadresse_poststed
                stiftelsesdato
                vedtektsfestetformaal
                hjemmeside
            }
            reviewAverageByBedrift(organisasjonsnummer: ${parseInt(
              bedrift ? bedrift : "0",
            )})
            reviewSokCount(organisasjonsnummer:  ${parseInt(bedrift || "0")})
        }
    `;

  /**
   * Should update rating to given rating.
   * @param event for handling changes in rating chosen
   */
  const handleChange = (event: SelectChangeEvent) => {
    setRating(parseInt(event.target.value));
  };

  const { data, loading, error } = useQuery(BEDRIFT_QUERY, {
    fetchPolicy: "cache-first", // Used for first execution
    nextFetchPolicy: "cache-first", // Used for subsequent executions
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error.message} />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>bedrev | {data["bedriftByOrgNr"]["navn"].toUpperCase()}</title>
        <link rel="icon" type="image/svg+xml" href={bedrevIcon} />
      </Helmet>
      <Navbar page="Søk bedrifter" />
      <main className="h-fit text-purple overflow-hidden font-whyte">
        <section className="py-[40px] px-[8%] flex sm:flex-row flex-col w-full h-full items-center">
          <div className="sm:justify-left justify-center text-center sm:text-left w-full">
            <p className="font-medium sm:text-2xl text-lg leading-[40px] tracking-wide">
              BEDRIFTSPROFIL
            </p>
            <p className="sm:text-4xl text-2xl leading-[50px] font-bold">
              {data["bedriftByOrgNr"]["navn"].toUpperCase()}
            </p>
            <p className="tracking-wider pb-[20px]">
              ORGNR: {data["bedriftByOrgNr"]["organisasjonsnummer"]}
            </p>
          </div>
        </section>
        <section className="px-[8%] w-full h-full items-center">
          <div className="bg-purple-lighter pt-[30px] rounded-sm">
            <p className="w-full text-center font-medium sm:text-2xl text-xl leading-[60px] tracking-wide">
              Nøkkelpunkter
            </p>
            <div className="flex justify-center gap-12 sm:py-[4%] py-[20px] pb-[60px] px-[12%] flex-wrap">
              <KeyPoint
                keypointName={
                  data["bedriftByOrgNr"]["antallansatte"] + " Ansatte"
                }
                keypointIcon={"Workers"}
              />
              <a href={"https://" + data["bedriftByOrgNr"]["hjemmeside"]}>
                <KeyPoint
                  keypointName={data["bedriftByOrgNr"]["hjemmeside"]}
                  keypointIcon={"Globe"}
                />
              </a>

              <KeyPoint
                keypointName={data["bedriftByOrgNr"]["stiftelsesdato"]}
                keypointIcon={"Calendar"}
              />
              <KeyPoint
                keypointName={data["bedriftByOrgNr"]["postadresse_poststed"]}
                keypointIcon={"HQ"}
              />
            </div>
          </div>
        </section>
        <section className="px-[8%] mt-[40px] w-full h-full items-center ">
          <div className="bg-purple-lighter pt-[30px] rounded-sm">
            <p className="w-full text-center font-medium sm:text-2xl text-xl py-[20px]">
              Om bedriften
            </p>
            <p className="w-full text-center sm:text-base text-sm sm:leading-[35px] leading-[30px] sm:pb-[60px] pb-[60px] sm:px-[20%] px-[10%] tracking-wide">
              {data["bedriftByOrgNr"]["vedtektsfestetformaal"]}
            </p>
          </div>
        </section>
        <section className="px-[80px] py-[60px]">
          <Gallery imageList={mockImages} />
        </section>
        <section className="flex flex-col justify-center sm:px-[80px] px-[4%] sm:py-[60px] py-[20px] bg-purple-lighter">
          <p className="w-full font-medium sm:text-2xl text-xl tracking-wide">
            Tilbakemeldinger
          </p>
          <div className="flex text-xl py-2 h-full align-middle items-center">
            <p>{data["reviewAverageByBedrift"] | 0}</p>
            <div className="px-2">
              <Rating
                value={Math.round(data["reviewAverageByBedrift"] | 0)}
                color="red"
                readOnly
                precision={0.5}
              />
            </div>
            <p className="text-right w-full tracking-wide sm:text-lg text-base">
              {data["reviewSokCount"] | 0} Tilbakemeldinger
            </p>
          </div>
          <div className="py-4">
            <div className="w-full h-[2px] bg-black flex "></div>
          </div>

          <div className="py-[20px]">
            <div className="flex gap-2 align-middle items-center">
              <Icon icon="Filter" />
              <p className="mt-1">Filtrer/Sorter etter </p>
              <FormControl className="border-none w-[120px] focus:border-none">
                <Select
                  disableUnderline
                  variant="standard"
                  className="font-bold w-fit"
                  value={String(rating)}
                  label="Rating"
                  onChange={handleChange}
                >
                  <MenuItem className="text-sm" value={0}>
                    Tittel A-Z
                  </MenuItem>
                  <MenuItem className="text-sm" value={1}>
                    1 stjerne
                  </MenuItem>
                  <MenuItem className="text-sm" value={2}>
                    2 stjerner
                  </MenuItem>
                  <MenuItem className="text-sm" value={3}>
                    3 stjerner
                  </MenuItem>
                  <MenuItem className="text-sm" value={4}>
                    4 stjerner
                  </MenuItem>
                  <MenuItem className="text-sm" value={5}>
                    5 stjerner
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <ReviewResults bedrift={bedrift} />
          {authToken !== null ? (
            <div className="pt-[60px]">
              <ReviewCreator
                bedriftOrgNr={bedrift || ""}
                workplace={data["bedriftByOrgNr"]["navn"]}
              />
            </div>
          ) : (
            <div>
              <p className="text-left pt-12 tracking-normal">
                Du er ikke logget inn, logg inn for å{" "}
                <span className="underline underline-offset-2">
                  skrive tilbakemeldinger
                </span>
              </p>
              <div className="py-4">
                <Link to={"/logg-inn"}>
                  <Button text="Logg inn" icon="ArrowRight" flex px="[20px]" />
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Company;
