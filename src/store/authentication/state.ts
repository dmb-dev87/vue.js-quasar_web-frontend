export interface AuthStateInterface {
  url: string;
  userId: string;
  username: string;
  token: string;
  loggedin: boolean;
}

function state(): AuthStateInterface {
  return {
    url: "",
    userId: "",
    username: "",
    token: "",
    loggedin: false,
  };
}

export default state;
