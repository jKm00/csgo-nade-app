package no.edvardsen.backend.features.authentication.dtos;

import lombok.Data;

/**
 * Represents an object containing a token
 * 
 * @author Joakim
 */
@Data
public class TokenRequest {

  private String token;

}
