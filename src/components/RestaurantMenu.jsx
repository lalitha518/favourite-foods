import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { IMAGE_URL } from "../utils/constants";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const [listOfMenu, setListOfMenu] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { resId } = useParams();

  console.log("Captured resId:", resId); // Check if resId is correct here

  // Using useCallback to memoize fetchMenu and prevent it from being re-created on every render
  const fetchMenu = useCallback(async () => {
    try {
      const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId=${resId}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const json = await response.json();
      console.log("Fetched menu data:", JSON.stringify(json, null, 2));
      setListOfMenu(json.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setIsLoading(false);
    }
  }, [resId]); // Include resId as dependency

  useEffect(() => {
    if (resId) {
      fetchMenu();
    }
  }, [resId, fetchMenu]); // Add fetchMenu to the dependency array

  // Ensure that itemCards is accessed correctly based on the structure of the data
  const itemCards =
    listOfMenu?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card?.card?.itemCards || [];

  return (
    <div>
      <h2>
        {listOfMenu?.cards?.[2]?.card?.card?.info?.name || "No Name Available"}
      </h2>
      {isLoading ? (
        <Shimmer />
      ) : (
        <section className="menu">
          <div className="menu-items">
            {itemCards.length > 0 ? (
              itemCards.map((item, index) => {
                const imageId = item?.card?.info?.imageId;
                const imageUrl = imageId ? `${IMAGE_URL}/${imageId}` : "";
                return (
                  <div key={index} className="menu-item">
                    <div className="item-details">
                      <div className="item-info">
                        <div className="item-name">{item?.card?.info?.name}</div>
                        <div className="item-price">
                          ₹{(item?.card?.info?.price || item?.card?.info?.defaultPrice) / 100}
                        </div>
                        <div className="item-description">
                          {item?.card?.info?.description || "No description available."}
                        </div>
                      </div>
                      <div className="item-action">
                        <img
                          src={imageUrl}
                          alt={item?.card?.info?.name || "Food Item"}
                        />
                        <button className="order-button">Order Now</button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>No items available</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default RestaurantMenu;
