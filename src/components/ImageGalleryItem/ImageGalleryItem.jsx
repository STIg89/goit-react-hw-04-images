import { useState } from 'react';
import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ webformatURL, tags, largeImageURL }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onToggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <GalleryItem>
      <GalleryItemImage src={webformatURL} alt={tags} onClick={onToggleModal} />
      {isVisible && (
        <Modal image={largeImageURL} tags={tags} onClose={onToggleModal} />
      )}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
