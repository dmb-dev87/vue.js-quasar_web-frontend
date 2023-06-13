import { MutationTree } from 'vuex';
import { LocaleStateInterface } from './state';

const mutation: MutationTree<LocaleStateInterface> = {
  setLocale (state: LocaleStateInterface, locale: string) {
    state.locale = locale
  }
};

export default mutation;
