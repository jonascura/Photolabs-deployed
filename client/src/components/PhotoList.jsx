import React from "react";

import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";

const PhotoList = ({ photos, updateToFavPhotoIds, favoritePhotos, openModal, realPhotos, clickedPhoto }) => {
  console.log("inside Photolist", photos);

  // handle photos passed in from modal
  if (!photos) {
    photos=realPhotos.find(photo => photo.id === clickedPhoto.id).similar_photos;
    console.log("inside Photolist function", clickedPhoto, photos);
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
