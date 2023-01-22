package no.edvardsen.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Strat;

public interface StratRepository extends JpaRepository<Strat, Long> {
  List<Strat> findByMap(CsgoMap map);
}
