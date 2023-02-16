import { useEffect } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ image, tags, onClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  }, [onClose]);

  const onCloseModal = e => {
    const clickedTo = e.target.id;
    const pressedKey = e.code;

    if (clickedTo === 'backdrop' || pressedKey === 'Escape') {
      onClose();
    }
  };

  return (
    <Backdrop id="backdrop" onClick={onCloseModal}>
      <ModalWrap onClose={onClose}>
        <img src={image} alt={tags} />
      </ModalWrap>
    </Backdrop>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};
