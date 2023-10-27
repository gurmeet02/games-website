import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GameCard from "../components/GameCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function GamePage() {
  const { id } = useParams();
  const [game, setGame] = useState({
    gameData: [],
    loaded: false,
  });
  const [click, setClick] = useState(0);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${id}?key=9dd3311aadfd453084bf095433ebc462`
    )
      .then((res) => res.json())
      .then((data) =>
        setGame({
          gameData: data,
          loaded: true,
        })
      );
  }, [click]);

  const [relatedGames, setRelatedGames] = useState({
    gameData: [],
    loaded: false,
  });

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${id}/game-series?key=9dd3311aadfd453084bf095433ebc462&ordering=-metacritic`
    )
      .then((res) => res.json())
      .then((data) =>
        setRelatedGames({
          gameData: data.results,
          loaded: true,
        })
      );
  }, [click]);

  const [showMore, setShowMore] = useState(false);

  const changeGame = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
      delay: 12,
    });
    setClick(click + 1);
  };

  const name = game.gameData.name;
  const releaseDate = game.gameData.released;
  const Image = game.gameData.background_image;
  const metacritic = game.gameData.metacritic;
  const description = game.gameData.description_raw;
  //   array data
  const esrbRating = game.gameData.esrb_rating;
  const genres = game.gameData.genres;
  const developers = game.gameData.developers;
  const platforms = game.gameData.platforms;

  document.title = `GameZone | Game | ${name}`

  return (
    <section className="bg-dark w-full max-md:py-4">
      {game.loaded ? (
        <main className="p-8 max-md:px-4">
          <div className="flex gap-8 items-center max-xl:flex-col">
            <img
              src={Image}
              alt='hello'
              className="rounded-2xl w-1/2 object-cover aspect-[7.7/5] max-xl:w-full"
              loading="lazy"
            />
            <div className="w-1/2 max-xl:w-full">
              <h3 className="font-semibold text-4xl text-white tracking-wide">
                {name}
              </h3>
              <div className="flex items-center justify-between py-2">
                <p className="text-lg text-light font-medium tracking-wider">
                  {releaseDate}
                </p>
                <span
                  className={`text-lg text-light border-2 ${
                    metacritic > 69 ? "border-green" : "border-orange"
                  } ${
                    metacritic < 39 ? "border-red" : ""
                  } px-2 py-0.5 font-medium rounded-xl ${
                    metacritic === null ? "opacity-0" : ""
                  }`}
                >
                  {metacritic === null ? 99 : metacritic}
                </span>
              </div>
              <ul className="flex flex-wrap py-5 gap-3">
                {genres.map((genre, index) => {
                  return (
                    <li
                      key={index}
                      className="py-1 px-2.5 border-[1.5px] border-primary rounded-xl text-white font-medium cursor-default"
                    >
                      {genre.name}
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col gap-2">
                <h5 className="text-white font-medium flex gap-1 text-lg">
                  ESRB Rating:{" "}
                  <span className="text-light font-normal text-base">
                    {esrbRating === null ? 'Not Found' : esrbRating.name}
                  </span>
                </h5>
                <h5 className="text-white font-medium flex gap-x-1 flex-wrap text-lg">
                  Developers:{" "}
                  {developers.map((dev, index) => {
                    return (
                      <span key={index} className="text-light font-normal text-base">
                        {dev.name}
                        {index != developers.length - 1 ? "," : ""}
                      </span>
                    );
                  })}
                </h5>
              </div>
            </div>
          </div>
          <div className="py-6">
            <p className="text-light">
              {!showMore ? description.slice(0, 750) + "..." : description}
            </p>
            <button
              className="text-primary underline font-medium tracking-wide"
              onClick={() => {
                setShowMore(!showMore);
              }}
            >
              {!showMore ? "Read More" : "Show Less"}
            </button>
            <ul className="py-6 text-white tracking-wide font-medium flex gap-1.5 flex-wrap text-lg">
              Platforms:
              {platforms.map((platform, index) => {
                return (
                  <li key={index} className="text-light font-normal text-base">
                    {platform.platform.name}
                    {index != platforms.length - 1 ? "," : ""}
                  </li>
                );
              })}
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-medium text-white tracking-wide">
              Related Games:
            </h4>
            <div className="py-4">
              <Swiper
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              390: {
                slidesPerView: 1.25,
              },
              576: {
                slidesPerView: 1.8,
              },
              768: {
                slidesPerView: 2.5,
              },
              1080: {
                slidesPerView: 3,
              },
              1440: {
                slidesPerView: 3.5,
              },
            }}
            modules={[Navigation]}
            spaceBetween={24}
            navigation={true}
            style={{
              "--swiper-navigation-color": "#ddd",
              "--swiper-navigation-size": "2rem",
            }}
              >
                {relatedGames.gameData === undefined
                  ? null
                  : relatedGames.gameData
                      .slice(0, 6)
                      .map((relatedGame, index) => {
                        return (
                          <SwiperSlide key={index} onClick={changeGame}>
                            <GameCard
                              name={relatedGame.name}
                              image={relatedGame.background_image}
                              releaseDate={relatedGame.released}
                              metacritic={relatedGame.metacritic}
                              id={relatedGame.id}
                            />
                          </SwiperSlide>
                        );
                      })}
              </Swiper>
            </div>
          </div>
        </main>
      ) : (
        <div className="w-full flex justify-center items-center h-[88.75vh]">
          <button type="button" className="bg-indigo-500" disabled>
            <svg
              className="animate-spin -ml-1 mr-3 h-10 w-10 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
