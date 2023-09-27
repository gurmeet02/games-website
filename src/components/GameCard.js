import React from "react";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";

const GameCard = ({ name, image, metacritic, releaseDate, id }) => {
  return (
    <Link to={`/game/${id}`}>
      <main className="rounded-lg w-full relative cursor-pointer overflow-hidden border border-light hover:bg-lighter-dark transition-all duration-300 game-card max-md:rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-all duration-300 brightness-90 max-md:h-56"
          loading="lazy"
        />
        <div className="p-2 pl-3">
          <h4 className="text-xl font-medium tracking-wide text-white pb-2 relative w-fit">
            {name.length < 20 ? name : name.slice(0, 19) + "..."}
          </h4>
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
        </div>
      </main>
    </Link>
  );
};

export default GameCard;
