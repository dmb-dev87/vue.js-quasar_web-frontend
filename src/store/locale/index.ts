import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { LocaleStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const localeModule: Module<LocaleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default localeModule;
