// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia';
import { useTestCounterStore } from './testCounter';

import { expect } from '@jest/globals';

describe('01 Test counter store', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('01 - 1 Increments', () => {
    const counterStore = useTestCounterStore();
    expect(counterStore.counter).toBe(0);
    counterStore.increment();
    expect(counterStore.counter).toBe(1);
  });

  it('01 - 2 Increments by amount', () => {
    const counterStore = useTestCounterStore();
    counterStore.increment(10);
    expect(counterStore.counter).toBe(10);
  });
});
