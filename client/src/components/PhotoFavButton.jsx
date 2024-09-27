import React from 'react';

import FavIcon from './FavIcon';
import '../styles/PhotoFavButton.scss';

function PhotoFavButton({ favoritePhotos, switchLike}) {
  // console.log("inside button", favoritePhotos, switchLike);

  return (
    <div className="photo-list__fav-icon" onClick={switchLike}>
      <div className="photo-list__fav-icon-svg">
        <FavIcon selected={favoritePhotos} />
      </div>
    </div>
  );
}

export default PhotoFavButton;