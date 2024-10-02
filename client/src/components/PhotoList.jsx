import React from "react";
import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const PhotoList = ({ photos, loadMorePhotos, updateToFavPhotoIds, favoritePhotos, openModal, realPhotos, clickedPhoto }) => {
  return (
    <InfiniteScroll
      dataLength={photos.length} // This will keep track of how many photos are loaded
      next={loadMorePhotos} // Call loadMorePhotos to fetch more photos
      hasMore={photos.length < 100} // Change this to reflect your total photos count if needed
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
