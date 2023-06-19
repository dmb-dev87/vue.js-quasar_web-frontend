export interface UserLocationInterface {
  latitude: string;
  longitude: string;
  speed: string;
  altitude: string;
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
      latitude: "",
      longitude: "",
      speed: "",
      altitude: "",
    },
  };
}

export default state;
