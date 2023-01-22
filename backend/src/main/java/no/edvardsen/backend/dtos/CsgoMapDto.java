package no.edvardsen.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class CsgoMapDto {
  private String name;
  private String thumbnail;
  private String radar;
  private boolean isAvailable;

  public boolean isAvailable() {
    return this.isAvailable;
  }
}
