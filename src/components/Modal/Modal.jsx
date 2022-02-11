import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.switchBodyScroll('hidden');
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.switchBodyScroll('unset');
  }

  switchBodyScroll(state) {
    document.body.style.overflow = state;
  }

  handleKeyDown = ({ code }) => {
    if (code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { closeModal, children } = this.props;
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
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
