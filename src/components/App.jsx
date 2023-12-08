import React, { useState, useEffect, useMemo } from 'react';
import { fetchImages } from 'api/fetchImages';
import { ImageGallery } from './Gallery/ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { LoadMoreBtn } from './LoadMoreBtn/LoadMoreBtn';
import { Loader } from './Loader/Loader';
import { MyModal } from './Modal/Modal';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { animateScroll as scroll } from 'react-scroll';

function App() {
  const [dataImages, setDataImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tagImageAlt, setTagImageAlt] = useState('');
  const [availablePages, setAvailablePages] = useState(0);

  const updateImages = useMemo(
    () => async () => {
      try {
        setIsLoading(true);
        setError(false);
        const initialImages = await fetchImages(searchQuery, page);
        const { hits, totalHits } = initialImages;
        if (hits.length > 0) {
          setDataImages(prevImages => [...prevImages, ...hits]);
          setAvailablePages(Math.ceil(totalHits / 12));
          toast.success('Successfully found!');
        } else {
          toast.error('Nothing found. Check the correctness of the search word.');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, page]
  );

  useEffect(() => {
    updateImages();
  }, [updateImages]);

  const handleFormSubmit = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setDataImages([]);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    scroll.scrollToBottom();
  };

  const handleOpenModal = image => {
    const { largeImageURL, tags } = image;
    setShowModal(true);
    setLargeImageURL(largeImageURL);
    setTagImageAlt(tags);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setLargeImageURL('');
    setTagImageAlt('');
  };

  return (
    <div>
      <Searchbar onFormSubmit={handleFormSubmit} />
      {isLoading && <Loader />}
      {error && <h1>{error.message}</h1>}
      {dataImages.length > 0 && (
        <ImageGallery dataImages={dataImages} onOpenModal={handleOpenModal} />
      )}
      {page !== availablePages && dataImages.length >= 11 && !error && (
        <LoadMoreBtn onLoadMore={handleLoadMore} />
      )}
      {showModal && (
        <MyModal onCloseModal={handleCloseModal}>
          <img src={largeImageURL} alt={tagImageAlt} />
        </MyModal>
      )}
      <GlobalStyle />
      <Toaster />
    </div>
  );
}

export default App;