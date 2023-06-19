import { MutationTree } from 'vuex';
import { AuthStateInterface, UserLocationInterface } from './state';

const mutation: MutationTree<AuthStateInterface> = {
  setUrl (state: AuthStateInterface, url: string) {
    state.url = url
  },
  setUsername (state: AuthStateInterface, username: string) {
    state.username = username
  },
  setLoggedin (state: AuthStateInterface, loggedin: boolean) {
    state.loggedin = loggedin
  },
  setToken (state: AuthStateInterface, token: string) {
    state.token = token
  },
  setUserid (state: AuthStateInterface, userid: string) {
    state.userId = userid
  },
  setPosition (state: AuthStateInterface, position: UserLocationInterface) {
    state.position = position;
  },
};

export default mutation;
