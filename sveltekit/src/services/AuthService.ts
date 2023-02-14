import userToken from "@/stores/userToken";
import { goto } from "$app/navigation";
import type { UserTokens } from "@/types/UserTokens";
import axios from 'axios';
import API from "@/lib/AxiosApi";

const KEYCLOAK_BASE_URL = import.meta.env.VITE_KEYCLOAK_BASE_URL;
const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM;
const KEYCLOAK_CLIENT_ID = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
const KEYCLOAK_URL = `${KEYCLOAK_BASE_URL}/auth/realms/${KEYCLOAK_REALM}/protocol/openid-connect/`

let access_token: string;
let refresh_token: string;
userToken.subscribe((token) => {
  access_token = token.access_token;
  refresh_token = token.refresh_token;
})

/**
 * Tries to login a user with credentials
 * 
 * @param username of the user
 * @param password of the user
 * @param successRedirect a path to where to redirect the user on login success
 * @param onError a function called when login fails
 */
const login = async (
  username: string,
  password: string,
  successRedirect: string,
  onError: (error: string) => void
) => {
  API.post(
    `${KEYCLOAK_URL}token`,
    new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID,
      grant_type: 'password',
      username: username,
      password: password,
    })
  ).then((res) => {
    updateUserToken({
      access_token: res.access_token,
      refresh_token: res.refresh_token
    });
    redirect(successRedirect);
  }).catch((err) => {
    onError(err);
  });
}

/**
 * Logs out the user stored in the user token store
 */
const logout = async () => {
  API.post(
    `${KEYCLOAK_URL}logout`,
    new URLSearchParams({
      client_id: KEYCLOAK_CLIENT_ID,
      refresh_token: refresh_token
    })
  ).then((res) => {
    updateUserToken({
      access_token: '',
      refresh_token: '',
    })
    redirect('/')
  })
}

/**
 * Updates the user token store with the given value
 * 
 * @param token to store
 */
const updateUserToken = (token: UserTokens) => {
  userToken.update(() => {
    return token;
  })
}

/**
 * Redirects the user to the given path
 * 
 * @param path to redirect to 
 */
const redirect = (path: string) => {
  goto(path);
}

const AUTH = {
  login,
  logout
}

export default AUTH;