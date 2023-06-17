export interface AuthStateInterface {
  url: string;
  userId: string;
  username: string;
  token: string;
  loggedin: boolean;
  trackgps: boolean;
  latitude: string;
  longitude: string;
}

function state(): AuthStateInterface {
  return {
    url: "",
    userId: "",
    username: "",
    token: "",
    loggedin: false,
    trackgps: false,
    latitude: "",
    longitude: ""
  };
}

export default state;
