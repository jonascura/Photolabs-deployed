import { useReducer, useEffect } from 'react';

const initialState = {
  selectedPhoto: null,
  favoritePhotos: [],
  modal: false,
  photos: [],
  topics: [],
  currentPage: 1,
  totalPhotos: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_PHOTO':
      return {
        ...state,
        selectedPhoto: action.payload,
        modal: true,
      };
    case 'TOGGLE_FAVORITE':
      const isPhotoInFavorites = state.favoritePhotos.includes(action.payload);
      return {
        ...state,
        favoritePhotos: isPhotoInFavorites
          ? state.favoritePhotos.filter((id) => id !== action.payload)
          : [...state.favoritePhotos, action.payload],
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        selectedPhoto: null,
        modal: false,
      };
      case 'SET_PHOTOS':
        return {
          ...state,
          photos: action.append ? [...state.photos, ...action.payload] : action.payload,
        };
    case 'SET_TOPICS':
      return {
        ...state,
        topics: action.payload,
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // Fetch initial photos data
    fetchPhotos(state.currentPage);
    
    // Fetch topics data
    fetch('https://photolabs-deployed-ygl5.onrender.com/api/topics')
      .then((response) => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then((data) => dispatch({ type: 'SET_TOPICS', payload: data }))
      .catch((error) => console.error('Error fetching topics:', error));
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  const fetchPhotos = (page, append = false) => {
    fetch(`https://photolabs-deployed-ygl5.onrender.com/api/photos?page=${page}&limit=6`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          dispatch({ type: 'SET_PHOTOS', payload: data, append });
        } else {
          console.error('Fetched data is not an array', data);
        }
      })
      .catch(error => console.error('Error fetching photos:', error));
  };
  
  // When loading more photos, ensure you append them
  const loadMorePhotos = () => {
    const nextPage = state.currentPage + 1;
    dispatch({ type: 'SET_CURRENT_PAGE', payload: nextPage });
    fetchPhotos(nextPage, true); // Append more photos instead of overwriting
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
    loadMorePhotos,
    onPhotoSelect,
    updateToFavPhotoIds,
    onClosePhotoDetailsModal,
  };
};

export default useApplicationData;
