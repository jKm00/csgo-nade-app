package no.edvardsen.backend.features.authentication.dtos;

import lombok.Data;

@Data
public class LoginRequest {
  private String username;
  private String password;
}
