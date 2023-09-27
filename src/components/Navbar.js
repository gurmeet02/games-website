import React, { useState } from "react";
import Logo from "../assets/game_zone_logo.svg";
import { useNavigate } from "react-router-dom";
import HamBurgerMenu from "../assets/ham_burger_menu.svg";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate("");

  function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector(".search");
    navigate(`/search/${input.value}`);
    input.blur();
    document.querySelector("form").reset();
  }
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="py-4 px-10 lg:bg-secondary w-full max-md:px-8 max-lg:flex max-lg:flex-col max-lg:gap-6 max-lg:bg-dark">
      <nav className="flex items-center justify-between max-md:gap-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 cursor-pointer max-sm:w-1/4 max-md:w-1/2"
        >
          <img src={Logo} alt="GameZone" className="w-9 max-sm:w-12" />
          <h2 className="font-bold text-3xl text-light tracking-wide max-sm:hidden">
            <span className="text-primary">Game</span>Zone
          </h2>
        </Link>
        <div className="w-1/4 max-lg:w-2/5 max-md:w-1/2 max-lg:flex max-lg:gap-x-4 max-lg:items-center max-sm:w-11/12">
          <div className="text-light w-4/5 flex bg-transparent outline hover:outline-primary hover:text-primary items-center gap-2 px-3 rounded-xl max-lg:w-full max-lg:h-9">
            <i className="bx bx-search text-2xl"></i>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="search outline-none bg-transparent w-full text-light font-medium"
                placeholder="Search..."
              />
            </form>
          </div>
          <button
            className="lg:hidden"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <img src={HamBurgerMenu} alt="Menu" className="w-10" />
          </button>
        </div>
      </nav>
      <div
        className={`lg:hidden transition-all duration-300 ${
          showMenu ? "h-48 opacity-100" : "h-0 w-0 opacity-0"
        }`}
      >
        <Sidebar />
      </div>
    </section>
  );
}
