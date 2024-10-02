import React from "react";

import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, updateToFavPhotoIds, favoritePhotos, openModal, realPhotos, clickedPhoto }) => {
  // console.log("inside Photolist", photos);

  // handle photos passed in from modal
  if (!photos && clickedPhoto) {
    const foundPhoto = realPhotos.find(photo => photo.id === clickedPhoto.id);
    if (foundPhoto && foundPhoto.similar_photos) {
      photos = foundPhoto.similar_photos;
    } else {
      // If no similar photos are found, set photos to an empty array to avoid errors
      photos = [];
    }
  }

  return (
    <ul className="photo-list">
      {photos.map(photo => (
        <PhotoListItem key={photo.id} photo={photo} updateToFavPhotoIds={updateToFavPhotoIds} favoritePhotos={favoritePhotos} openModal={openModal} />
      ))}
    </ul>
  );
};

export default PhotoList;