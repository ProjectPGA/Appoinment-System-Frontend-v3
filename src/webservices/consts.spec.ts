import { BASE_URL, apiPrefix } from './consts';

describe('01 BASE_URL const', () => {
  it('01 - 1 Should be the value of VITE_API_URL', () => {
    expect(BASE_URL).toBe(import.meta.env.VITE_API_URL);
  });

  it('01 - 2 Should be empty when the value of VITE_API_URL is not valid', () => {
    const originalEnv = import.meta.env.VITE_API_URL;

    import.meta.env.VITE_API_URL = null;

    expect(BASE_URL).toBe('');

    import.meta.env.VITE_API_URL = originalEnv;
  });
});

describe('02 ApiPrefix', () => {
  it('02 - 1 Check that ApiPrefix mount url correctly', () => {
    const COMPLETE_URL: string = apiPrefix('/mockPath');

    expect(COMPLETE_URL).toBe(BASE_URL + '/mockPath');
  });
});
