import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { LocaleStateInterface } from './state';

const getters: GetterTree<LocaleStateInterface, StateInterface> = {
  someGetter (/* context */) {
    // your code
  }
};

export default getters;
