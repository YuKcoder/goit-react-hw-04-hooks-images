import { useState, useEffect } from 'react';
import { Wrapper } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/';
import Modal from 'components/Modal';
import { getImages } from 'services/images-api';
import { Watch } from 'react-loader-spinner';
import toast from 'react-hot-toast';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fullSizeImg, setFullSizeImg] = useState('');
  const [isEndOfArray, setIsEndOfArray] = useState(false);

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    fetchImages();
  }, [searchQuery]);

  const handleFormSubmit = query => {
    setSearchQuery(query);
    setPage(1);
    setImages([]);
  };

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      const { data } = await getImages(searchQuery, page);

      if (data.hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query.Please try again'
        );
        setIsLoading(false);
        return;
      }
      if (page > data.totalHits / 12) {
        toast.error(
          'We are sorry, but you have reached the end of search results.'
        );
        setIsEndOfArray(true);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setImages(prevImage => [...prevImage, ...data.hits]);
      setPage(prevPage => prevPage + 1);

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openModal = largeImageURL => {
    setShowModal(true);
    setFullSizeImg(largeImageURL);
  };

  const closeModal = () => {
    setShowModal(false);
    setFullSizeImg('');
  };

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && (
        <Loader>
          <Watch />
        </Loader>
      )}

      {images.length !== 0 && !isEndOfArray && (
        <Button onClick={fetchImages}>Load more</Button>
      )}

      {showModal && (
        <Modal closeModal={closeModal}>
          <img src={fullSizeImg} alt={searchQuery} />
        </Modal>
      )}
    </Wrapper>
  );
}
