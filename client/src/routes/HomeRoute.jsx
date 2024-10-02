import React from 'react';
import useApplicationData from 'hooks/useApplicationData';

import '../styles/HomeRoute.scss';
import PhotoList from '../components/PhotoList';
import TopNavigationBar from '../components/TopNavigationBar';

const HomeRoute = ({ openModal, updateToFavPhotoIds, favoritePhotos }) => {
  const { state, loadMorePhotos } = useApplicationData();
  const { photos, topics, totalPhotos } = state;

  return (
    <div className="home-route">
      <TopNavigationBar topics={topics} updateToFavPhotoIds={updateToFavPhotoIds} favoritePhotos={favoritePhotos} />
      <PhotoList 
        photos={photos} 
        loadMorePhotos={loadMorePhotos} 
        totalPhotos={totalPhotos}
        updateToFavPhotoIds={updateToFavPhotoIds} 
        favoritePhotos={favoritePhotos} 
        openModal={openModal} 
      />
    </div>
  );
};

export default HomeRoute;
