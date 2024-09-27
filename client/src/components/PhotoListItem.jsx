import React from "react";

import "../styles/PhotoListItem.scss";
import "../styles/PhotoList.scss";
import PhotoFavButton from "./PhotoFavButton";

const PhotoListItem = ({ photo, updateToFavPhotoIds, favoritePhotos, openModal }) => {
  // console.log("inside PhotoListItem", photo)
  const { id, location, urls, user } = photo;

  return (
    <div className="photo-list__item">
      <PhotoFavButton favoritePhotos={favoritePhotos.includes(id)} switchLike={() => updateToFavPhotoIds(id)}/>
      {/* modal activated on image click */}
      <img src={urls.regular} alt={`Photo ${id}`} className="photo-list__image" onClick={() => openModal(photo)}/>
      <div className="photo-list__user-details">
        <img src={user.profile} alt={`${user.name}'s profile`} className="photo-list__user-profile" />
        <div className="photo-list__user-info">
          {user.username}
          <div className="photo-list__user-location">{location.city}, {location.country}</div>
        </div>
      </div>
    </div>
  );

};

export default PhotoListItem;
