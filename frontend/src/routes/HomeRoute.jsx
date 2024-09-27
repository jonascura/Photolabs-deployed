import React, { useState } from 'react';

import '../styles/HomeRoute.scss';
import PhotoList from '../components/PhotoList';
import TopNavigationBar from '../components/TopNavigationBar';

const HomeRoute = ({ photos, topics, openModal, updateToFavPhotoIds, favoritePhotos, getPhotosByTopicId }) => {

  // console.log("from home", getPhotosByTopicId)

  return (
    <div className="home-route">
      {/* Insert React */}
      <TopNavigationBar topics={topics} updateToFavPhotoIds={updateToFavPhotoIds} favoritePhotos={favoritePhotos} getPhotosByTopicId={getPhotosByTopicId} />
      <PhotoList photos={photos} updateToFavPhotoIds={updateToFavPhotoIds} favoritePhotos={favoritePhotos} openModal={openModal} />
    </div>
  );
};

export default HomeRoute;
