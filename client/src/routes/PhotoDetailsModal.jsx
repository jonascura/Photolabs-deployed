import React, { useEffect, useRef } from 'react';
import '../styles/PhotoDetailsModal.scss';
import "../styles/PhotoList.scss";
import "../styles/PhotoListItem.scss";
import closeSymbol from '../assets/closeSymbol.svg';
import PhotoFavButton from 'components/PhotoFavButton';
import PhotoList from 'components/PhotoList';

const PhotoDetailsModal = ({ photos, closeModal, photo, favoritePhotos, updateToFavPhotoIds, openModal, clickedPosition }) => {
  const { id, location, urls, user, similar_photos } = photo;
  const modalRef = useRef(null);

  // Formatting similar photos URLs
  const formattedSimilarPhotos = similar_photos.map(similarPhoto => ({
    ...similarPhoto,
    urls: {
      full: `https://photolabs-deployed-ygl5.onrender.com/images/${similarPhoto.urls.full.split('/').pop()}`,
      regular: `https://photolabs-deployed-ygl5.onrender.com/images/${similarPhoto.urls.regular.split('/').pop()}`
    },
    user: {
      ...similarPhoto.user,
      profile: `https://photolabs-deployed-ygl5.onrender.com/images/${similarPhoto.user.profile.split('/').pop()}`
    }
  }));

  // Close modal when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div className="photo-details-modal-overlay">
      <div 
        ref={modalRef}
        className="photo-details-modal"
        style={{ 
          top: `${clickedPosition.y}px`, 
          left: `${clickedPosition.x}px`, 
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%', // Prevent overflow
          maxHeight: '90vh', // Limit height
          overflow: 'auto' // Allow scrolling if needed
        }} 
      >
        <button className="photo-details-modal__close-button" onClick={closeModal}>
          <img src={closeSymbol} alt="close symbol" />
        </button>

        <div className="photo-details-modal__images">
          <PhotoFavButton favoritePhotos={favoritePhotos.includes(id)} switchLike={() => updateToFavPhotoIds(id)} />
          <img src={urls.regular} alt={`Photo ${id}`} className="photo-details-modal__image" />
          <div className="photo-details-modal__photographer-details">
            <img src={user.profile} alt={`${user.name}'s profile`} className="photo-list__user-profile" />
            <div className="photo-list__user-info">
              {user.name}
              <div className="photo-list__user-location">{location.city}, {location.country}</div>
            </div>
          </div>

          {/* Divider */}
          <div className="photo-details-modal__top-bar">
            <div className="photo-details-modal__header">Similar Photos</div>
          </div>

          {/* Similar Photos */}
          <ul className="photo-list">
            <PhotoList 
              photos={formattedSimilarPhotos}
              updateToFavPhotoIds={updateToFavPhotoIds} 
              favoritePhotos={favoritePhotos} 
              openModal={openModal} 
              realPhotos={photos} 
              clickedPhoto={photo} 
            />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsModal;
