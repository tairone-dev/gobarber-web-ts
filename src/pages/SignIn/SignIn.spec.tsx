import React from 'react';
import { fireEvent, render, wait } from '@testing-library/react';
import SignIn from './index';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/AuthContext', () => {
  return {
    useAuth: () => ({
      signIn: mockedSignIn,
    }),
  };
});

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast,
    }),
  };
});

describe('Signin Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    const { getByTestId } = render(<SignIn />);

    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const buttonElement = getByTestId('submit');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid email', async () => {
    const { getByTestId } = render(<SignIn />);

    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const buttonElement = getByTestId('submit');

    fireEvent.change(emailField, { target: { value: 'non-valid-email' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should not be able to sign in without password', async () => {
    const { getByTestId } = render(<SignIn />);

    const emailField = getByTestId('email');
    const buttonElement = getByTestId('submit');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display toast if signin fails', async () => {
    mockedSignIn.mockImplementationOnce(() => {
      throw new Error();
    });

    const { getByTestId } = render(<SignIn />);

    const emailField = getByTestId('email');
    const passwordField = getByTestId('password');
    const buttonElement = getByTestId('submit');

    fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
    fireEvent.change(passwordField, { target: { value: '123456' } });

    fireEvent.click(buttonElement);

    await wait(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
      );
    });
  });
});
