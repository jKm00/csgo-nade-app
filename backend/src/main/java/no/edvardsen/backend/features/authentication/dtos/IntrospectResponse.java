package no.edvardsen.backend.features.authentication.dtos;

import lombok.Data;

/**
 * Continas infomration from the introspect response
 * 
 * @author Joakim
 */
@Data
public class IntrospectResponse {

  private Boolean active;

}
