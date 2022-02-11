import { Watch } from 'react-loader-spinner';
import { Wrapper } from './Loader.styled';

export default function Loader() {
  return (
    <Wrapper>
      <Watch heigth="100" width="100" color="#3f51b5" ariaLabel="loading" />
    </Wrapper>
  );
}
