package no.edvardsen.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Strat;

public interface CsgoMapRepository extends JpaRepository<CsgoMap, Long> {
  CsgoMap findByNameIgnoreCase(String name);
}
