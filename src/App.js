import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  const [listOfRes, setListOfRes] = useState([]);
  const [originalList, setOriginalList] = useState([]); // To keep original list

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
    setOriginalList(restaurantData); // Store original list for filtering
  };

  return (
    <div className="app">
      <Header
        listOfRes={listOfRes}
        setListOfRes={setListOfRes}
        originalList={originalList}
      />
      <div className="body">
        <div className="filter">
          <button
            className="filter-btn"
            onClick={() => {
              const filterData = originalList.filter((res) => {
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
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
