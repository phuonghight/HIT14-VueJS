import { defineStore } from 'pinia';

export const useCounterOptionStore = defineStore('counter.opion', {
  state: () => ({
    count: 0,
    name: 'Pinia',
    age: 6,
  }),
  getters: {
    trippleCount: (state) => {
      // code ....
      return state.count * 3;
    },
    trippleCountPlusTwo() {
      return this.trippleCount + 2;
    },
  },
  actions: {
    increament() {
      this.count++;
    },
  },
});
