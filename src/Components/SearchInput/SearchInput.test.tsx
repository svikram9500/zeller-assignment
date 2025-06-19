import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import SearchInput from './SearchInput';

describe('SearchInput', () => {
  it('renders with default placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={() => {}} />
    );

    expect(getByPlaceholderText('Search')).toBeTruthy();
  });

  it('renders with custom placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={() => {}} placeholder="Type here..." />
    );

    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  it('shows the input value', () => {
    const { getByDisplayValue } = render(
      <SearchInput value="vikram" onChangeText={() => {}} />
    );

    expect(getByDisplayValue('vikram')).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const mockChange = jest.fn();

    const { getByPlaceholderText } = render(
      <SearchInput value="" onChangeText={mockChange} />
    );

    fireEvent.changeText(getByPlaceholderText('Search'), 'Singh');
    expect(mockChange).toHaveBeenCalledWith('Singh');
  });
});
