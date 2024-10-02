import React from 'react';

import '../styles/TopNavigationBar.scss'
import TopicList from './TopicList';
import FavBadge from './FavBadge';

const TopNavigation = ({ topics, favoritePhotos, getPhotosByTopicId }) => {
  // console.log("insideTopNavBar", getPhotosByTopicId)

  return (
    <div className="top-nav-bar">
      <span className="top-nav-bar__logo">PhotoLabs</span>
      <TopicList topics={topics} getPhotosByTopicId={getPhotosByTopicId} />
      <FavBadge favoritePhotos={favoritePhotos} />
    </div>
  )
}

export default TopNavigation;