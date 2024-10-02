import React from "react";
import "../styles/PhotoListItem.scss";
import "../styles/PhotoList.scss";
import PhotoFavButton from "./PhotoFavButton";

const PhotoListItem = ({ photo, updateToFavPhotoIds, favoritePhotos, openModal }) => {
  const { id, location, urls, user } = photo;

  // Handle photo click to pass the photo and clicked position
  const handlePhotoClick = (event) => {
    const clickedPosition = { x: event.clientX, y: event.clientY };
    openModal(photo, clickedPosition); // Pass photo and position to openModal
  };

  return (
    <div className="photo-list__item">
      <PhotoFavButton 
        favoritePhotos={favoritePhotos.includes(id)} 
        switchLike={() => updateToFavPhotoIds(id)}
      />
      {/* modal activated on image click */}
      <img 
        src={urls.regular} 
        alt={`Photo ${id}`} 
        className="photo-list__image" 
        loading="lazy" 
        onClick={handlePhotoClick} // Use the new handler
      />
      <div className="photo-list__user-details">
        <img 
          src={user.profile} 
          alt={`${user.name}'s profile`} 
          className="photo-list__user-profile" 
          loading="lazy" 
        />
        <div className="photo-list__user-info">
          {user.username}
          <div className="photo-list__user-location">{location.city}, {location.country}</div>
        </div>
      </div>
    </div>
  );
};

export default PhotoListItem;
