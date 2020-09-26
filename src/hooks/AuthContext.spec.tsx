import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from './AuthContext';
import api from '../services/api';

const apiMock = new MockAdapter(api);

describe('Auth Context', () => {
  it('should be able to signin', async () => {
    const id = 'user123';
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const password = '123456';
    const mockUser = {
      id,
      name,
      email,
      password,
    };
    const token = 'token-123';

    apiMock.onPost('sessions').reply(200, {
      user: mockUser,
      token,
    });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const { signIn } = result.current;

    signIn({
      email,
      password,
    });

    await waitForNextUpdate();

    const { user } = result.current;

    expect(user.email).toEqual(email);
    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', token);
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(mockUser),
    );
  });

  it('should restore saved data from storage when authcontext initializes', () => {
    const id = 'user123';
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const password = '123456';
    const mockUser = {
      id,
      name,
      email,
      password,
    };
    const token = 'token-123';

    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      switch (key) {
        case '@GoBarber:token':
          return token;
        case '@GoBarber:user':
          return JSON.stringify(mockUser);
        default:
          return null;
      }
    });

    const {
      result: {
        current: { user },
      },
    } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(user).toEqual(mockUser);
  });

  it('should be able to sign out', async () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should ble able to update user data', async () => {
    const id = 'user123';
    const name = 'John Doe';
    const email = 'johndoe@example.com';
    const password = '123456';
    const avatar_url = 'imate-test.jpg';
    const user = {
      id,
      name,
      email,
      password,
      avatar_url,
    };

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );
    expect(result.current.user).toEqual(user);
  });
});
