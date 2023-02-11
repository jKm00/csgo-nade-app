package no.edvardsen.backend.features.authentication.dtos;

import lombok.Data;

/**
 * A class containing information about the response after a login request is
 * succesfull
 */
@Data
public class LoginResponse {

  private String access_token;
  private String refresh_token;
  private int expiry_in;
  private int refresh_expiry_in;
  private String token_type;

}
