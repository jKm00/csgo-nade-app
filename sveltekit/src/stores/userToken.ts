import { browser } from "$app/environment";
import type { UserTokens } from "@/types/UserTokens";
import { writable } from "svelte/store";

const initialAccessToken = browser ? window.localStorage.getItem('access_token') ?? '' : '';
const initialRefreshToken = browser ? window.localStorage.getItem('refresh_token') ?? '' : '';

const userToken = writable<UserTokens>({
  access_token: initialAccessToken,
  refresh_token: initialRefreshToken
})

userToken.subscribe((value) => {
  if (browser) {
    window.localStorage.setItem('access_token', value.access_token);

    window.localStorage.setItem('refresh_token', value.refresh_token);
  }
})

export default userToken;