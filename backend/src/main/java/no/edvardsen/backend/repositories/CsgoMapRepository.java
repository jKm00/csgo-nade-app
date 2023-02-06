package no.edvardsen.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.CsgoMap;

public interface CsgoMapRepository extends JpaRepository<CsgoMap, Long> {
  Optional<CsgoMap> findByNameIgnoreCase(String name);
}
