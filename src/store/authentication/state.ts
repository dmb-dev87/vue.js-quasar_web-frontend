export interface UserLocationInterface {
  trackgps: boolean;
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
  position: UserLocationInterface;
}

function state(): AuthStateInterface {
  return {
    url: "",
    userId: "",
    username: "",
    token: "",
    loggedin: false,
    position: {
      trackgps: false,
      latitude: "",
      longitude: "",
      speed: "",
      altitude: "",
    },
  };
}

export default state;
