import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [listOfRes, setListOfRes] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();
    console.log(json);

    const restaurants =
      json.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    const restaurantData = restaurants.map((restaurant) => {
      return restaurant.info;
    });

    setListOfRes(restaurantData);
  };

  return (
    <div className="app">
      <Header />
      <div className="body">
        <div className="filter">
          <button
            className="filter-btn"
            onClick={() => {
              const filterData = listOfRes.filter((res) => {
                return res.avgRating > 4.2;
              });
              setListOfRes(filterData);
              console.log(filterData);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
        <div className="res-container">
          {listOfRes.map((restaurant) => (
            <RestaurantCard
              key={restaurant.id} 
              restaurant={restaurant}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
