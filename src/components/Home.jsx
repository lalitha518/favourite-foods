import React, { useEffect, useCallback } from "react";
import RestaurantCard from "./RestaurantCard";
import { useAppContext } from "../myContext";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

const Home = () => {
  const { listOfRes, setListOfRes, originalList, setOriginalList } =
    useAppContext();

  // Memoize fetchData to avoid re-creating the function on every render
  const fetchData = useCallback(async () => {
    const response = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await response.json();
    console.log(json);

    const restaurants =
      json.data?.cards?.[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || [];
    const restaurantData = restaurants.map((restaurant) => {
      return restaurant.info;
    });

    setListOfRes(restaurantData);
    setOriginalList(restaurantData); // Store original list for filtering
  }, [setListOfRes, setOriginalList]);

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Add fetchData to the dependency array

  return listOfRes === null ? (
    <Shimmer />
  ) : (
    <div className="app">
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
            <Link
              className="res-card-link"
              key={restaurant.id}
              to={`/restaurant/${restaurant.id}`}
            >
              <RestaurantCard restaurant={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
