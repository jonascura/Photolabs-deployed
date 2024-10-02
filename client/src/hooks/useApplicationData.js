import { useReducer, useEffect } from 'react';

const initialState = {
  selectedPhoto: null,
  favoritePhotos: [],
  modal: false,
  photos: [],
  topics: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_PHOTO':
      return {
        ...state,
        selectedPhoto: action.payload,
        modal: true
      };
    case 'TOGGLE_FAVORITE':
      const isPhotoInFavorites = state.favoritePhotos.includes(action.payload);
      return {
        ...state,
        favoritePhotos: isPhotoInFavorites
          ? state.favoritePhotos.filter(id => id !== action.payload)
          : [...state.favoritePhotos, action.payload]
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPhoto: null,
        modal: false
      };
      case 'SET_PHOTOS':
        return {
          ...state,
          photos: action.payload.map(photo => ({
            ...photo,
            urls: {
              full: `https://photolabs-deployed-ygl5.onrender.com/images/${photo.urls.full.split('/').pop()}`,
              regular: `https://photolabs-deployed-ygl5.onrender.com/images/${photo.urls.regular.split('/').pop()}`
            },
            user: {
              ...photo.user,
              profile: `https://photolabs-deployed-ygl5.onrender.com/images/${photo.user.profile.split('/').pop()}`
            },
            similar_photos: photo.similar_photos.map(similarPhoto => ({
              ...similarPhoto,
              urls: {
                full: `https://photolabs-deployed-ygl5.onrender.com/images/${similarPhoto.urls.full.split('/').pop()}`,
                regular: `https://photolabs-deployed-ygl5.onrender.com/images/${similarPhoto.urls.regular.split('/').pop()}`
              },
              user: {
                ...similarPhoto.user,
                profile: `https://photolabs-deployed-ygl5.onrender.com/images/${similarPhoto.user.profile.split('/').pop()}`
              }
            }))
          }))
        };
    case 'SET_TOPICS':
      return {
        ...state,
        topics: action.payload
      };
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch photos data
    fetch('https://photolabs-deployed-ygl5.onrender.com/api/photos', { mode: 'cors' })
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_PHOTOS', payload: data }))
      .catch(error => console.error('Error fetching photos:', error));

    // Fetch topics data
    fetch('https://photolabs-deployed-ygl5.onrender.com/api/topics', { mode: 'cors' })
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_TOPICS', payload: data }))
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  // Function to fetch photos by topic ID
  const getPhotosByTopicId = (topicId) => {
    fetch(`https://photolabs-deployed-ygl5.onrender.com/api/topics/photos/${topicId}`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        // Dispatch action to update photos based on topic ID
        dispatch({ type: 'SET_PHOTOS', payload: data }); // Use formatting function when setting photos
      })
      .catch(error => console.error(`Error fetching photos for topic ID ${topicId}:`, error));
  };

  const onPhotoSelect = (photo) => {
    dispatch({ type: 'SELECT_PHOTO', payload: photo });
  };

  const updateToFavPhotoIds = (photoId) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  };

  const onClosePhotoDetailsModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  return {
    state,
    onPhotoSelect,
    updateToFavPhotoIds,
    onClosePhotoDetailsModal,
    getPhotosByTopicId,
    fetchAllPhotos
  };
};

export default useApplicationData;
