import React from "react";
import { Link } from "react-router-dom";

import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/Newsletter";

function Home() {
  return (
    <>
      <section className="hero">

        <div className="hero-content">
          <p>OUR BESTSELLERS</p>

          <h1>
            Latest Arrivals
          </h1>

          <p>
            Discover our new collection of
            fashion products.
          </p>

          <Link to="/collection">
            <button>SHOP NOW</button>
          </Link>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
            alt="Fashion store"
          />
        </div>

      </section>

      <LatestCollection />

      <BestSeller />

      <OurPolicy />

      <NewsletterBox />
    </>
  );
}

export default Home;