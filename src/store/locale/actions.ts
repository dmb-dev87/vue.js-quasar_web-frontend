import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { LocaleStateInterface } from './state';

const actions: ActionTree<LocaleStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
