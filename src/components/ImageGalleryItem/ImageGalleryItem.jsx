import PropTypes from 'prop-types';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  picture,
  tags,
  largeImageURL,
  onOpenImage,
}) {
  return (
    <GalleryItem>
      <GalleryItemImg
        src={picture}
        alt={tags}
        onClick={() => {
          onOpenImage(largeImageURL);
        }}
      />
    </GalleryItem>
  );
}

ImageGalleryItem.propTypes = {
  picture: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func.isRequired,
};
