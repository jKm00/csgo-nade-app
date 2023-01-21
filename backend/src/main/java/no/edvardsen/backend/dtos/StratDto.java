package no.edvardsen.backend.dtos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class StratDto {
  private String name;
  private List<LineupDto> lineups;
}
