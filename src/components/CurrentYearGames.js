import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import GameCard from "./GameCard";
import { Link } from "react-router-dom";

export default function TrendingGames() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const currentDate =
    date.getFullYear() + "-" + "0" + month + "-" + date.getDate();

  const oldDD = date.getDate() - 21;

  const oldDate =
    oldDD.toString().length === 1
      ? date.getFullYear() + "-" + "0" + month + "-" + "0" + oldDD
      : date.getFullYear() + "-" + "0" + month + "-" + oldDD;

  const [trendingGames, setTrendingGames] = useState({
    games: [],
    loaded: false,
  });
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=9dd3311aadfd453084bf095433ebc462&dates=${year},${currentDate}&ordering=-metacritic`
    )
      .then((res) => res.json())
      .then((data) =>
        setTrendingGames({
          games: data.results.slice(0, 12),
          loaded: true,
        })
      );
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-[2.1rem] text-white tracking-wide pb-4">
          {year} Games
        </h3>
        <Link
          to={`${year}/games`}
          className="font-medium relative text-xl after:transition-all text-white flex items-start after:h-[2px] after:w-10 after:absolute after:bg-primary after:bottom-0 hover:after:w-full active:text-light max-sm:hidden"
        >
          See More
          <i className="bx bx-chevron-right text-2xl"></i>
        </Link>
      </div>
      {trendingGames.loaded ? (
        <main className="flex items-center">
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
            spaceBetween={32}
            slidesPerView={3}
            loop={true}
            navigation={true}
            style={{
              "--swiper-navigation-color": "#ddd",
              "--swiper-navigation-size": "2rem",
            }}
          >
            {trendingGames.games.map((game, index) => {
              return (
                <SwiperSlide key={index}>
                  <GameCard
                    name={game.name}
                    image={game.background_image}
                    releaseDate={game.released}
                    metacritic={game.metacritic}
                    id={game.id}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </main>
      ) : (
        <div className="w-full flex justify-center items-center">
          <button type="button" className="bg-indigo-500" disabled>
            <svg
              class="animate-spin -ml-1 mr-3 h-8 w-8 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
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
