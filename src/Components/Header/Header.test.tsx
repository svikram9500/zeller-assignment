import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Header from './Header';

// Mock the useNavigation hook
const mockPop = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    pop: mockPop,
  }),
}));

describe('Header', () => {
  it('renders the title', () => {
    const { getByText } = render(<Header title="User List" />);
    expect(getByText('User List')).toBeTruthy();
  });

  it('renders the back button and triggers navigation.pop on press', () => {
    const { getByText } = render(<Header title="User List" showBackButton={true} />);
    const backButton = getByText('Back');
    fireEvent.press(backButton);
    expect(mockPop).toHaveBeenCalled();
  });

  it('does not render back button when showBackButton is false', () => {
    const { queryByText } = render(<Header title="User List" showBackButton={false} />);
    expect(queryByText('Back')).toBeNull();
  });
});
