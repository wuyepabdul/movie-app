import React from "react";
import Hero from "../components/Hero";
import CardList from "../components/CardList";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="p-5">
      <Hero />
      <CardList />
      <Footer />
    </div>
  );
};

export default HomePage;
