import React, { useState, useEffect } from "react";
import GameCard from "../components/GameCard";
import ArrowIcon from "../assets/arrow_icon.svg";

export default function TopRatedPage() {
  const [page, setPage] = useState(1);
  document.title = `GameZone | Top Rated | ${page}`;

  const nextPage = () => {
    setPage(page + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth", delay: 12 });
  };

  const prevPage = () => {
    setPage(page - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth", delay: 12 });
  };

  const [ratedGames, setRatedGames] = useState({
    games: [],
    loaded: false,
  });

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=9dd3311aadfd453084bf095433ebc462&metacritic=80,100&page=${page}`
    )
      .then((res) => res.json())
      .then((data) =>
        setRatedGames({
          games: data,
          loaded: true,
        })
      );
  }, [page]);

  return (
    <section className="bg-dark w-full p-8 max-sm:py-16">
      <h3 className="font-semibold text-[2.1rem] text-white tracking-wide pb-4">
        Top Rated
      </h3>
      {ratedGames.loaded ? (
        <main>
          <main className="gap-x-8 gap-y-10 grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
            {ratedGames.games.results != undefined
              ? ratedGames.games.results.map((game, index) => {
                  return (
                    <GameCard
                      key={index}
                      name={game.name}
                      image={game.background_image}
                      releaseDate={game.released}
                      metacritic={game.metacritic}
                      id={game.id}
                    />
                  );
                })
              : null}
          </main>
          <div className="flex justify-between items-center py-8 px-12 max-md:px-0">
            <button
              className={`text-white font-medium text-xl flex items-end ${
                page > 1 ? "" : "opacity-0"
              }`}
              onClick={prevPage}
            >
              <img
                src={ArrowIcon}
                alt="Previous"
                className="rotate-180 w-6 relative"
              />
              Previous
            </button>
            <button
              className="text-white font-medium text-lg flex items-end"
              onClick={nextPage}
            >
              Next
              <img src={ArrowIcon} alt="Next" className="w-6 relative" />
            </button>
          </div>
        </main>
      ) : (
        <div className="w-full flex justify-center items-center h-[67.5vh]">
          <button type="button" className="bg-indigo-500" disabled>
            <svg
              class="animate-spin -ml-1 mr-3 h-10 w-10 text-primary"
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
