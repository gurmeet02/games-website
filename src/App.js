import React, { createContext } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import HomePage from "./pages/HomePage";
import TopRatedPage from "./pages/TopRatedPage";
import CurrentYearPage from "./pages/CurrentYearPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GamePage from "./pages/GamePage";
import SearchPage from "./pages/SearchPage";

function App() {
  const date = new Date()
  const year = date.getFullYear()
  return (
    <BrowserRouter>
      <section className="flex flex-wrap relative bg-dark">
        <nav className="w-full fixed z-[100]">
          <Navbar />
        </nav>
        <aside className="w-1/4 fixed top-[4.27rem] z-[100] max-lg:hidden">
          <Sidebar />
        </aside>
        <main className="w-3/4 relative top-[4.27rem] lg:left-[25%] max-lg:w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/top-rated" element={<TopRatedPage />} />
            <Route path={`${year}/games`} element={<CurrentYearPage />} />
            <Route path={`/game/:id`} element={<GamePage />} />
            <Route path={`/search/:search`} element={<SearchPage />} />
          </Routes>
        </main>
      </section>
    </BrowserRouter>
  );
}

export default App;
