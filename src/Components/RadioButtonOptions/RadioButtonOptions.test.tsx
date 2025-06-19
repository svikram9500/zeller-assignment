import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import RadioButtonOptions from './RadioButtonOptions';

describe('RadioButtonOptions', () => {
  const options = [
    { label: 'Admin', value: 'ADMIN' },
    { label: 'Manager', value: 'MANAGER' },
  ];

  const mockOnChange = jest.fn();

  it('renders title and all options', () => {
    const { getByText } = render(
      <RadioButtonOptions
        title="Select Role"
        options={options}
        selectedValue="ADMIN"
        onChange={mockOnChange}
      />
    );

    expect(getByText('Select Role')).toBeTruthy();
    expect(getByText('Admin')).toBeTruthy();
    expect(getByText('Manager')).toBeTruthy();
  });

  it('highlights the selected option', () => {
    const { getByTestId } = render(
      <RadioButtonOptions
        title="Select Role"
        options={options}
        selectedValue="MANAGER"
        onChange={mockOnChange}
      />
    );
  
    const selectedOption = getByTestId('option-MANAGER');
    const unselectedOption = getByTestId('option-ADMIN');
  
    const selectedStyles = Array.isArray(selectedOption.props.style)
      ? selectedOption.props.style
      : [selectedOption.props.style];
  
    const unselectedStyles = Array.isArray(unselectedOption.props.style)
      ? unselectedOption.props.style
      : [unselectedOption.props.style];
  
    expect(selectedStyles).toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#e3f0ff' })])
    );
  
    expect(unselectedStyles).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ backgroundColor: '#e3f0ff' })])
    );
  });
  

  it('calls onChange when an option is pressed', () => {
    const { getByText } = render(
      <RadioButtonOptions
        title="Select Role"
        options={options}
        selectedValue="ADMIN"
        onChange={mockOnChange}
      />
    );

    fireEvent.press(getByText('Manager'));
    expect(mockOnChange).toHaveBeenCalledWith('MANAGER');

    fireEvent.press(getByText('Admin'));
    expect(mockOnChange).toHaveBeenCalledWith('ADMIN');
  });
});
