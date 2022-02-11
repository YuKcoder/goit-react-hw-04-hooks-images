import PropTypes from 'prop-types';
import { Component } from 'react';
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

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = evt =>
    this.setState({ searchQuery: evt.currentTarget.value.toLowerCase() });

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.error('Please type something');
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleSubmit}>
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
            value={this.state.searchQuery}
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
