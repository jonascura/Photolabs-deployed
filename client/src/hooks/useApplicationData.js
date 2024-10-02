import { useReducer, useEffect, useCallback } from 'react';

const initialState = {
  selectedPhoto: null,
  favoritePhotos: [],
  modal: false,
  photos: [],
  topics: [],
  page: 1, // Add a page tracker for pagination
  isLoading: false, // To prevent multiple requests at once
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_PHOTO':
      return { ...state, selectedPhoto: action.payload, modal: true };
    case 'TOGGLE_FAVORITE':
      const isPhotoInFavorites = state.favoritePhotos.includes(action.payload);
      return {
        ...state,
        favoritePhotos: isPhotoInFavorites
          ? state.favoritePhotos.filter(id => id !== action.payload)
          : [...state.favoritePhotos, action.payload],
      };
    case 'CLOSE_MODAL':
      return { ...state, selectedPhoto: null, modal: false };
    case 'SET_PHOTOS':
      return {
        ...state,
        photos: [...state.photos, ...action.payload], // Append new photos to the current list
        isLoading: false, // Reset loading state
      };
    case 'SET_TOPICS':
      return { ...state, topics: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: true };
    case 'INCREMENT_PAGE':
      return { ...state, page: state.page + 1 }; // Increment the page count
    default:
      return state;
  }
};

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch photos data
  const fetchPhotos = useCallback(() => {
    if (state.isLoading) return; // Prevent multiple calls if already loading

    dispatch({ type: 'SET_LOADING' });
    const { page } = state;
    const limit = 9;

    fetch(`https://photolabs-deployed.onrender.com/api/photos?page=${page}&limit=${limit}`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_PHOTOS', payload: data });
        dispatch({ type: 'INCREMENT_PAGE' });
      })
      .catch(error => console.error('Error fetching photos:', error));
  }, [state.page, state.isLoading]);

  // Infinite scroll logic to trigger more photo fetching
  useEffect(() => {
    const handleScroll = () => {
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
      if (bottom && !state.isLoading) {
        fetchPhotos(); // Fetch more photos when reaching the bottom
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchPhotos, state.isLoading]);

  useEffect(() => {
    // Initial fetch for the first page of photos
    fetchPhotos();
  }, [fetchPhotos]);

  // Fetch topics data
  useEffect(() => {
    fetch('https://photolabs-deployed.onrender.com/api/topics', { mode: 'cors' })
      .then(response => response.json())
      .then(data => dispatch({ type: 'SET_TOPICS', payload: data }))
      .catch(error => console.error('Error fetching topics:', error));
  }, []);

  const onPhotoSelect = (photo) => dispatch({ type: 'SELECT_PHOTO', payload: photo });
  const updateToFavPhotoIds = (photoId) => dispatch({ type: 'TOGGLE_FAVORITE', payload: photoId });
  const onClosePhotoDetailsModal = () => dispatch({ type: 'CLOSE_MODAL' });

  return {
    state,
    onPhotoSelect,
    updateToFavPhotoIds,
    onClosePhotoDetailsModal,
  };
};

export default useApplicationData;
