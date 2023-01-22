package no.edvardsen.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.CsgoMap;

public interface CsgoMapRepository extends JpaRepository<CsgoMap, Long> {
  CsgoMap findByNameIgnoreCase(String name);
}
