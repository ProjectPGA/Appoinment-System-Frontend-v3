// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia';

describe('useProductStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('increments', () => {
    // Add test at store
  });
});
