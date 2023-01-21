package no.edvardsen.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import no.edvardsen.backend.models.NadeType;

@AllArgsConstructor
@Data
public class LineupDto {
  private String name;
  private String desc;
  private NadeType nade;
  private double throwCoordinateX;
  private double throwCoordinateY;
  private double landCoordinateX;
  private double landCoordinateY;
  private String videoPath;
}
