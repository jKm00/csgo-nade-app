package no.edvardsen.backend.features.authentication.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.features.authentication.dtos.IntrospectResponse;
import no.edvardsen.backend.features.authentication.dtos.LoginRequest;
import no.edvardsen.backend.features.authentication.dtos.LoginResponse;
import no.edvardsen.backend.features.authentication.dtos.LogoutResponse;
import no.edvardsen.backend.features.authentication.dtos.TokenRequest;

/**
 * Service for handling authorization
 * 
 * @author Joakim
 */
@RequiredArgsConstructor
@Service
public class AuthService {

  private final RestTemplate restTemplate;

  @Value("${keycloak-base-url}")
  private String keycloakBaseUrl;

  @Value("${keycloak-realm}")
  private String keycloakRealm;

  @Value("${spring.security.oauth2.client.provider.keycloak.issuer-uri}")
  private String issueUrl;

  @Value("${spring.security.oauth2.client.registration.oauth2-client-credentials.client-id}")
  private String clientId;

  @Value("${spring.security.oauth2.client.registration.oauth2-client-credentials.client-secret}")
  private String clientSecret;

  @Value("${spring.security.oauth2.client.registration.oauth2-client-credentials.authorization-grant-type}")
  private String grantType;

  /**
   * Tries to sign in a user
   * 
   * @param credentials of the user
   * @return a login response containing access token and refresh token if login
   *         is successful
   */
  public LoginResponse login(LoginRequest credentials) {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    map.add("client_id", this.clientId);
    map.add("client_secret", this.clientSecret);
    map.add("grant_type", this.grantType);
    map.add("username", credentials.getUsername());
    map.add("password", credentials.getPassword());

    HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);

    String LOGIN_URL = this.keycloakBaseUrl + "/realms/" + this.keycloakRealm + "/protocol/openid-connect/token";

    ResponseEntity<LoginResponse> response = this.restTemplate.postForEntity(LOGIN_URL, httpEntity,
        LoginResponse.class);

    return response.getBody();
  }

  /**
   * Signs out a user
   * 
   * @param token of the user to sign out
   * @throws Exception when sign out fails
   */
  public String logout(TokenRequest token) throws Exception {
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    map.add("client_id", this.clientId);
    map.add("client_secret", this.clientSecret);
    map.add("refresh_token", token.getToken());

    HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);

    String LOGOUT_URL = this.keycloakBaseUrl + "/realms/" + this.keycloakRealm + "/protocol/openid-connect/logout";

    ResponseEntity<LogoutResponse> response = this.restTemplate.postForEntity(LOGOUT_URL, httpEntity,
        LogoutResponse.class);

    String res;
    if (response.getStatusCode().is2xxSuccessful()) {
      res = "Logged out successfully";
    } else {
      throw new Exception("Something went wrong! Could not log out.");
    }

    return res;
  }

  /**
   * Checks wether or not a token has expired or not
   * 
   * @param token to check
   * @return {@code true} if token is active, {@code false} if token has expired
   */
  public boolean introspect(TokenRequest token) throws Exception {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    map.add("client_id", this.clientId);
    map.add("client_secret", this.clientSecret);
    map.add("token", token.getToken());

    HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(map, headers);

    String INTROSPECT_URL = this.keycloakBaseUrl + "/realms/" + this.keycloakRealm
        + "/protocol/openid-connect/token/introspect";

    ResponseEntity<IntrospectResponse> response = this.restTemplate.postForEntity(INTROSPECT_URL, httpEntity,
        IntrospectResponse.class);

    IntrospectResponse responseBody = response.getBody();
    if (responseBody == null) {
      throw new Exception("Introspect response contains null");
    }
    return responseBody.getActive();
  }

}
