import { BASE_URL, apiPrefix } from './consts';

describe('01 ApiPrefix', () => {
  it('01 - 1 Check that ApiPrefix mount url correctly', () => {
    const completeUrl: string = apiPrefix('/mockPath');

    expect(completeUrl).toBe(BASE_URL + '/mockPath');
  });
});
