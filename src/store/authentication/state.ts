export interface UserLocationInterface {
  latitude: number;
  longitude: number;
  speed: any;
  altitude: any;
}

export interface AuthStateInterface {
  url: string;
  userId: string;
  username: string;
  token: string;
  loggedin: boolean;
  trackgps: boolean;
  position: UserLocationInterface;
}

function state(): AuthStateInterface {
  return {
    url: "",
    userId: "",
    username: "",
    token: "",
    loggedin: false,
    trackgps: false,
    position: {
      latitude: 0,
      longitude: 0,
      speed: null,
      altitude: null,
    },
  };
}

export default state;
