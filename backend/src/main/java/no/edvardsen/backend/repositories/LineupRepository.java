package no.edvardsen.backend.repositories;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.Lineup;
import no.edvardsen.backend.models.CsgoMap;

public interface LineupRepository extends JpaRepository<Lineup, Long> {
  Optional<Lineup> findByNameIgnoreCase(String name);

  List<Lineup> findByMap(CsgoMap map);
}
