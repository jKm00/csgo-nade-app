package no.edvardsen.backend.features.authentication.dtos;

import lombok.Data;

/**
 * Used to convert a json object containing login credentials to java object
 */
@Data
public class LoginRequest {
  private String username;
  private String password;
}
