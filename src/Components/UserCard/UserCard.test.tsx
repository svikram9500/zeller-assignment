import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import UserCard from './UserCard';
import { User } from '../../graphql/types';

const mockUser: User = {
  id: '1',
  name: 'Vikram Singh',
  email: 'vikram@example.com',
  role: 'Admin',
};

describe('UserCard', () => {
  it('renders name and role correctly', () => {
    const { getByText } = render(<UserCard user={mockUser} />);
    expect(getByText('Vikram Singh')).toBeTruthy();
    expect(getByText('Admin')).toBeTruthy();
  });

  it('renders avatar initial', () => {
    const { getByText } = render(<UserCard user={mockUser} />);
    expect(getByText('V')).toBeTruthy(); // First letter of name
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<UserCard user={mockUser} onPress={onPressMock} />);

    fireEvent.press(getByText('Vikram Singh'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
