import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export default function Button({ onClick, children }) {
  return (
    <Btn type="button" onClick={onClick}>
      {children}
    </Btn>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
