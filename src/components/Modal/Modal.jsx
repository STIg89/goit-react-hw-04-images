import { useEffect } from 'react';
import { Backdrop, ModalWrap } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ image, tags, onClose }) => {
  useEffect(() => {
    const onCloseByEsc = e => {
      const pressedKey = e.code;
      if (pressedKey === 'Escape') onClose();
    };
    window.addEventListener('keydown', onCloseByEsc);

    return () => {
      window.removeEventListener('keydown', onCloseByEsc);
    };
  }, [onClose]);

  const onCloseByClick = e => {
    const clickedTo = e.target.id;
    if (clickedTo === 'backdrop') onClose();
  };

  return (
    <Backdrop id="backdrop" onClick={onCloseByClick}>
      <ModalWrap>
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
