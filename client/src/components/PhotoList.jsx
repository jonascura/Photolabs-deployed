import React, { useState } from "react";

import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const PhotoList = ({ photos, updateToFavPhotoIds, favoritePhotos, openModal, realPhotos, clickedPhoto }) => {
  // console.log("inside Photolist", photos);
  const [displayedPhotos, setDisplayedPhotos] = useState(photos.slice(0, 6));
  const [hasMore, setHasMore] = useState(true);

  const fetchMorePhotos = () => {
    if (displayedPhotos.length >= photos.length) {
      setHasMore(false);
      return;
    }
    // load next photo batch
    setDisplayedPhotos(photos.slice(0, displayedPhotos.length + 6));
  }

  // handle photos passed in from modal

  if (!photos) {
    photos=realPhotos.find(photo => photo.id === clickedPhoto.id).similar_photos;
    console.log("inside Photolist function", clickedPhoto, photos);
  }

  return (
    <InfiniteScroll
      dataLength={displayedPhotos.length}
      next={fetchMorePhotos}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more photos</p>}
    >
    <ul className="photo-list">
      {photos.map(photo => (
        <PhotoListItem key={photo.id} photo={photo} updateToFavPhotoIds={updateToFavPhotoIds} favoritePhotos={favoritePhotos} openModal={openModal} />
      ))}
    </ul>
    </InfiniteScroll>
  );
};

export default PhotoList;
