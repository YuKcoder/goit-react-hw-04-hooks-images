import { Component } from 'react';
import { Wrapper } from './App.styled';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Loader from 'components/Loader/';
import Modal from 'components/Modal';
import { getImages } from 'services/images-api';
import { Watch } from 'react-loader-spinner';
import toast from 'react-hot-toast';

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    isLoading: false,
    images: [],
    showModal: false,
    fullSizeImg: '',
    isEndOfArray: false,
  };

  handleFormSubmit = searchQuery => {
    this.setState({ images: [], searchQuery, page: 1 });
  };

  componentDidUpdate(_, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    try {
      this.setState({ isLoading: true });

      const { searchQuery, page } = this.state;
      const { data } = await getImages(searchQuery, page);

      if (data.hits.length === 0) {
        toast.error(
          'Sorry, there are no images matching your search query.Please try again'
        );
        this.setState({ isLoading: false });
        return;
      }
      if (this.state.page > data.totalHits / 12) {
        toast.error(
          'We are sorry, but you have reached the end of search results.'
        );
        this.setState({ isEndOfArray: true, isLoading: false });
        return;
      }
      this.setState(prevState => ({
        isLoading: false,
        images: [...prevState.images, ...data.hits],
        page: prevState.page + 1,
      }));

      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    } catch (error) {
      console.log(error);
    }
  };

  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      fullSizeImg: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, fullSizeImg: '' });
  };

  render() {
    const {
      searchQuery,
      images,
      isLoading,
      fullSizeImg,
      showModal,
      isEndOfArray,
    } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && (
          <Loader>
            <Watch />
          </Loader>
        )}

        {images.length !== 0 && !isEndOfArray && (
          <Button onClick={this.fetchImages}>Load more</Button>
        )}

        {showModal && (
          <Modal closeModal={this.closeModal}>
            <img src={fullSizeImg} alt={searchQuery} />
          </Modal>
        )}
      </Wrapper>
    );
  }
}

export default App;
