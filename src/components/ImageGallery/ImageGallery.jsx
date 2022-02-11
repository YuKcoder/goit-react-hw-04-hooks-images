import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ images, onImageClick }) {
  return (
    <Gallery>
      {images.map(({ id, largeImageURL, webformatURL, tags }) => {
        return (
          <ImageGalleryItem
            key={id}
            picture={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            onOpenImage={onImageClick}
          />
        );
      })}
    </Gallery>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }).isRequired
  ),
};
