import PropTypes from 'prop-types';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { ImSearch } from 'react-icons/im';
import { IconContext } from 'react-icons';
import {
  SearchbarContainer,
  SearchForm,
  SearchFormBtn,
  SearchFormBtnLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = evt =>
    setSearchQuery(evt.currentTarget.value.toLowerCase());

  const handleSubmit = evt => {
    evt.preventDefault();

    if (searchQuery.trim() === '') {
      toast.error('Please type something');
      return;
    }

    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <SearchbarContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormBtn type="submit">
          <IconContext.Provider value={{ color: '#3f51b5', size: '2em' }}>
            <>
              <ImSearch />
            </>
          </IconContext.Provider>

          <>
            <Toaster
              position="top-right"
              reverseOrder={true}
              toastOptions={{
                style: {
                  border: '2px solid red',
                  padding: '18px',
                  fontSize: '16px',
                },
              }}
            />
          </>
          <SearchFormBtnLabel>Search</SearchFormBtnLabel>
        </SearchFormBtn>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarContainer>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
