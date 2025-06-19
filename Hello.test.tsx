import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Hello test', () => {
  it('should render text', () => {
    const { getByText } = render(<Text>Hello, Vikram!</Text>);
    expect(getByText('Hello, Vikram!')).toBeTruthy();
  });
});
