
import { renderHook, act } from '@testing-library/react-hooks'
import useCatContextValue from './use-cat-context-value.hook';
import { CatContext } from '../contexts/cat.context'
import { SnackbarProvider } from 'notistack';
import { FunctionComponent, ReactNode } from 'react';

import { mockCats, mockFavorites, mockVotes } from './mock-cats';

const getControlledPromise = () => {
  let deffered: { resolve: any, reject: any } = { resolve: null, reject: null };
  const promise = new Promise((resolve, reject) => {
    deffered = { resolve, reject };
  });

  return { deffered, promise };
}
describe('Test useCatContextValue Hook', () => {

  const makeWrapper = (value: any): FunctionComponent => ({ children }: { children?: ReactNode }) => (
    <SnackbarProvider maxSnack={3}>
      <CatContext.Provider value={value}>
        {children}
      </CatContext.Provider>
    </SnackbarProvider>
  )
  it('should test isLoading initial state', () => {
    const { result } = renderHook(() => useCatContextValue(), { wrapper: makeWrapper(useCatContextValue) });
    expect(result.current.isLoading).toBe(false);
  });


  it('should test fetchCats', async () => {
    const { deffered, promise } = getControlledPromise();
    global.fetch = jest.fn(() => promise) as jest.Mock;
    const { result, waitForNextUpdate } = renderHook(() => useCatContextValue(), { wrapper: makeWrapper(useCatContextValue) });

    act(() => {
      result.current.fetchCats(true);
    });
    expect(result.current.isLoading).toBe(true);
    expect(result.current.cats.length).toBe(0);
    deffered.resolve({
      json: () => [mockCats[0]],
      ok: true
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.cats.length).not.toBe(0);

    expect(result.current.cats[0]).toStrictEqual({
      ...mockCats[0],
      "votes": 0 // After  vote and fav merge
    });
  });

  it('should test favoriteCat', async () => {
    const { deffered, promise } = getControlledPromise();
    global.fetch = jest.fn(() => promise) as jest.Mock;
    const { result, waitForNextUpdate } = renderHook(() => useCatContextValue(), { wrapper: makeWrapper(useCatContextValue) });

    act(() => {
      result.current.fetchCats(true);
    });
    deffered.resolve({
      json: () => mockCats,
      ok: true
    });
    await waitForNextUpdate();

    act(() => {
      result.current.favoriteCat(mockCats[0]);
    });
    deffered.resolve({
      json: () => null,
      ok: true
    });

    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
    expect(result.current.cats.length).not.toBe(0);

    expect(result.current.cats[0]).toStrictEqual({
      ...mockCats[0],
      "votes": 0 // After  vote and fav merge
    });
  });
})


