export interface AuthStateInterface {
  url: string;
  username: string;
  token: string;
  loggedin: boolean;
}

function state(): AuthStateInterface {
  return {
    url: "",
    username: "",
    token: "",
    loggedin: false,
  };
}

export default state;
