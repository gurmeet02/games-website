import React from "react";
import TopRatedGames from "../components/TopRatedGames";
import CurrentYearGames from "../components/CurrentYearGames";

export default function HomePage() {

  document.title = `GameZone | Home`
  
  return (
    <section className="bg-dark w-full">
      <main className="p-8 gap-12 flex flex-col max-sm:py-16 max-md:gap-16">
        <TopRatedGames />
        <CurrentYearGames />
      </main>
    </section>
  );
}
