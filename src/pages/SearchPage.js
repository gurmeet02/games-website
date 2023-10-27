import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GameCard from "../components/GameCard";

export default function SearchPage() {
  const search = useParams();

  const [games, setGames] = useState({
    gamesData: [],
    loaded: false,
  });

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=9dd3311aadfd453084bf095433ebc462&search=${search.search}&ordering=-metacritic&search_precise=true`
    )
      .then((res) => res.json())
      .then((data) =>
        setGames({
          gamesData: data.results,
          loaded: true,
        })
      );
  }, [search]);

  document.title = `GameZone | Search`

  return (
    <section className="bg-dark w-full max-lg:py-8">
      {games.loaded ? (
        <main className="p-8 gap-8 grid grid-cols-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
          {games.gamesData.slice(0, 15).map((game, index) => {
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
          })}
        </main>
      ) : (
        <div className="w-full flex justify-center items-center h-[88.6vh]">
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
