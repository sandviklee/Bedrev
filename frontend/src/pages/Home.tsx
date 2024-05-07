import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Button from "../components/Buttons/Button";
import SimpleReview from "../components/Reviews/SimpleReview";
import mockReviews from "../assets/mock/Reviews";
import { Link } from "react-router-dom";
import homepageArt from "/homepageArt.svg";
import bedrevIcon from "/bedrevIcon.svg";
import { useEffect, useState } from "react";

const HomePage = () => {
  const reviews = 3;
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [reviewAmount, setReviewAmount] = useState(reviews);

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
   * Changes how many Reviews
   * should be queried at
   * different screen sizes.
   */
  useEffect(() => {
    const largeMonitorWidth = 1200;
    const middleMonitorWidth = 900;
    setReviewAmount(
      dimensions.width > largeMonitorWidth
        ? reviews
        : dimensions.width > middleMonitorWidth
          ? reviews - 1
          : reviews - 2,
    );
  }, [dimensions.width]);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>bedrev | Hjemmeside</title>
        <link rel="icon" type="image/svg+xml" href={bedrevIcon} />
      </Helmet>
      <Navbar page="Hjem" />
      <div className=" h-auto w-full overflow-hidden font-whyte">
        <section className="sm:flex sm:flex-row items-center justify-center gap-[80px] px-[8%] sm:pt-[4%] pb-[8%]">
          <div className="leading-[40px] sm:text-3xl text-2xl">
            <p>Se gjennom bedrifter,</p>
            <p>finn din neste arbeidsgiver!</p>
            <p className="max-w-[480px] pt-4 text-base leading-[35px] py-6">
              Er du på jakt etter din neste jobbmulighet, eller bare nysgjerrig
              på hvordan det er å jobbe hos en bestemt bedrift? Hos{" "}
              <span className=" font-bold">bedrev</span> får du tilgang til
              tilbakemeldinger fra ansatte, innsyn i lønnsvilkår, bilder av
              kontorområder, og mye mer. Søk, utforsk og finn din drømmebedrift
              med oss i dag!
            </p>
            <Link to="/sok-bedrifter">
              <Button
                text="Søk gjennom bedrifter"
                icon="ArrowRight"
                flex
                px="[8%]"
              ></Button>
            </Link>
          </div>
          <div className="items-center justify-end">
            <img
              className=" sm:w-min-[520px] w-min-[300px]"
              src={homepageArt}
              alt="Two people working"
            />
          </div>
        </section>
        <section className="h-[500px] bg-purple-lighter">
          <div className="w-full justify-center text-center py-[30px] sm:leading-[30px]">
            <p className="sm:text-2xl text-xl font-medium text-purple">
              Skriv tilbakemeldinger til Bedrifter!
            </p>
            <p className="sm:text-base text-sm sm:leading-[30px] tracking-wider">
              Legg inn en tilbakemelding da vell!
              <br />
              Vi har{" "}
              <span className="underline-offset-1 underline">
                Norges toppbedrifter!
              </span>
            </p>
          </div>
          <div className="flex justify-center gap-4 px-2">
            {mockReviews.slice(0, reviewAmount).map((review) => (
              <SimpleReview
                key={review.title}
                title={review.title}
                desc={review.desc}
                workplace={review.workplace}
              />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
