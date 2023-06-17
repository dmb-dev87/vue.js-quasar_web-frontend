import { MutationTree } from 'vuex';
import { AuthStateInterface } from './state';

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
  setTrackGps (state: AuthStateInterface, trackgps: boolean) {
    state.trackgps = trackgps
  },
  setLatitude (state: AuthStateInterface, lat: string) {
    state.latitude = lat
  },
  setLongitude (state: AuthStateInterface, lng: string) {
    state.longitude = lng
  }
};

export default mutation;
