package no.edvardsen.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Strat;
import no.edvardsen.backend.repositories.StratRepository;

@Service
@RequiredArgsConstructor
public class StratService {

  private final StratRepository stratRepository;

  public List<Strat> findStratsByMap(CsgoMap map) {
    return this.stratRepository.findByMap(map);
  }

  public List<Strat> findAll() {
    return this.stratRepository.findAll();
  }

}
