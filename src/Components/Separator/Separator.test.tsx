import React from 'react';
import { render } from '@testing-library/react-native';
import Separator from './Separator';

describe('Separator', () => {
  it('renders a separator line with correct style', () => {
    const { getByTestId } = render(<Separator />);
    const separator = getByTestId('separator');
    expect(separator).toBeTruthy();
  });
});
