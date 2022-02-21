import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export default function Modal({ closeModal, children }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const switchBodyScroll = state => {
    document.body.style.overflow = state;
  };
  switchBodyScroll();

  const handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      closeModal();
    }
  };

  return (
    <Overlay
      onClick={({ target, currentTarget }) => {
        if (target === currentTarget) {
          closeModal();
        }
      }}
    >
      <ModalWindow>{children}</ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
