import React, { useEffect, useState } from "react";
import HomeIcon from "../assets/home_icon.svg";
import StarIcon from "../assets/star_icon.svg";
import CalenderIcon from "../assets/calender_icon.svg";
import { NavLink } from "react-router-dom";

export default function Sidebar() {

  const date = new Date()
  const year = date.getFullYear()

  return (
    <section className="bg-dark w-full border-r border-lighter-dark overflow-y-scroll h-[36rem] Sidebar max-lg:border-r-0 max-lg:h-fit max-lg:py-0">
      <main className="text-light p-4 max-md:py-2 max-md:px-0">
        <ul className="flex gap-4 flex-col">
          <li to="/">
            <NavLink
              to="/"
              className={`flex items-center gap-4 py-2 rounded-lg hover:bg-secondary px-3 max-lg:w-1/2 max-md:w-full`}
            >
              <img src={HomeIcon} alt="Home" className="w-8" />
              <h4 className="text-xl font-semibold text-white tracking-wide">
                Home
              </h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/top-rated"
              className={`flex items-center gap-4 py-2 rounded-lg hover:bg-secondary px-3 max-lg:w-1/2 max-md:w-full`}
            >
              <img src={StarIcon} alt="Home" className="w-8" />
              <h4 className="text-xl font-semibold text-white tracking-wide">
                Top Rated
              </h4>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${year}/games`}
              className="flex items-center gap-4 rounded-lg hover:bg-secondary py-2 px-3 max-lg:w-1/2 max-md:w-full"
            >
              <img src={CalenderIcon} alt="Home" className="w-8" />
              <h4 className="text-xl font-semibold text-white tracking-wide">
                {year} Games
              </h4>
            </NavLink>
          </li>
        </ul>
      </main>
    </section>
  );
}
