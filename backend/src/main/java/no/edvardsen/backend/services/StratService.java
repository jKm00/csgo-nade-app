package no.edvardsen.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.dtos.LineupDto;
import no.edvardsen.backend.dtos.StratDto;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Lineup;
import no.edvardsen.backend.models.Strat;
import no.edvardsen.backend.repositories.LineupRepository;
import no.edvardsen.backend.repositories.StratRepository;

@Service
@RequiredArgsConstructor
public class StratService {

  private final StratRepository stratRepository;
  private final LineupRepository lineupRepository;

  /**
   * Finds all strats for a given map
   * 
   * @param map to find strat for
   * @return list of strats
   */
  public List<Strat> findStratsByMap(CsgoMap map) {
    return this.stratRepository.findByMap(map);
  }

  /**
   * Returns all strats in database
   * 
   * @return list of strats
   */
  public List<Strat> findAll() {
    return this.stratRepository.findAll();
  }

  /**
   * Adds a strat to a specific map
   * 
   * @param map   to add strat to
   * @param strat to add
   */
  public void addStrat(CsgoMap map, StratDto strat) {
    Strat _strat = new Strat(strat.getName(), map);

    for (LineupDto lineup : strat.getLineups()) {
      Lineup _lineup = new Lineup(
          lineup.getName(),
          lineup.getDesc(),
          lineup.getNade(),
          lineup.getThrowCoordinateX(),
          lineup.getThrowCoordinateY(),
          lineup.getLandCoordinateX(),
          lineup.getLandCoordinateY(),
          lineup.getVideoPath());

      _strat.addLineup(_lineup);

      this.lineupRepository.save(_lineup);
    }

    this.stratRepository.save(_strat);
  }

}
