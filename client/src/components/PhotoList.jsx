import React from "react";
import PhotoListItem from "./PhotoListItem";
import "../styles/PhotoList.scss";
import InfiniteScroll from "react-infinite-scroll-component";

const PhotoList = ({ photos, loadMorePhotos, totalPhotos, updateToFavPhotoIds, favoritePhotos, openModal }) => {
  return (
    <InfiniteScroll
      dataLength={photos.length}
      next={loadMorePhotos}
      hasMore={photos.length < totalPhotos}
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
