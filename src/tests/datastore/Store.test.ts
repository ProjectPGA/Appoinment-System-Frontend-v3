// stores/counter.spec.ts
import { setActivePinia, createPinia } from 'pinia';
import { useCounterStore } from '@/datastore/counter';
import { expect, it, describe } from 'vitest';

describe('useProductStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia());
  });

  it('increments', () => {
    const counter = useCounterStore();
    expect(counter.count).toBe(0);
    counter.increment();
    expect(counter.count).toBe(1);
  });
});
