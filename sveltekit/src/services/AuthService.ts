import API from "./Api";

const KEYCLOAK_BASE_URL = import.meta.env.VITE_KEYCLOAK_BASE_URL;
const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM;

const LOGIN_URL = `${KEYCLOAK_BASE_URL}/auth/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;
const LOGOUT_URL = `${KEYCLOAK_BASE_URL}/auth/realms/${KEYCLOAK_REALM}/protocol/openid-connect/logout`;

const login = async (username: string, password: string) => {
  return API.post(
    LOGIN_URL,
    new URLSearchParams({
      client_id: 'my-app',
      grant_type: 'password',
      username: username,
      password: password,
    })
  );
}

const AUTH = {
  login
}

export default AUTH;