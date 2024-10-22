import React from 'react';
import { CDN_URL } from '../utils/constants';


const RestaurantCard = ({ restaurant }) => {
  const cloudinaryBaseUrl = CDN_URL;
  const imageUrl = `${cloudinaryBaseUrl}/${restaurant.cloudinaryImageId}`;

  return (
    <div className="res-card">
      <img className="res-logo" src={imageUrl} alt={restaurant.name} />
      <h3>{restaurant.name}</h3>
      <h4>Cuisines: {restaurant.cuisines.join(", ")}</h4>
      <h4>Rating: {restaurant.avgRating}</h4>
      <h4>Cost for Two: {restaurant.costForTwo}</h4>
      <h4>Delivery Area: {restaurant.areaName}</h4>
    </div>
  );
};

export default RestaurantCard;
