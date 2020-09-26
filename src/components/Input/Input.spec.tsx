import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';

import Input from './index';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input Component', () => {
  it('should be able to render an input', () => {
    const { getByTestId } = render(<Input name="email" data-testid="email" />);

    expect(getByTestId('email')).toBeTruthy();
  });

  it('should render highlight on input focus', async () => {
    const { getByTestId } = render(<Input name="email" data-testid="email" />);

    const inputElement = getByTestId('email');
    const containerElement = getByTestId('input-container');

    fireEvent.focus(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });

  it('should keep highlight on filled input blur', async () => {
    const { getByTestId } = render(<Input name="email" data-testid="email" />);

    const inputElement = getByTestId('email');
    const containerElement = getByTestId('input-container');

    fireEvent.change(inputElement, { target: { value: '123456' } });
    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });

  it('should not keep highlight on empty input blur', async () => {
    const { getByTestId } = render(<Input name="email" data-testid="email" />);

    const inputElement = getByTestId('email');
    const containerElement = getByTestId('input-container');

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });
});
