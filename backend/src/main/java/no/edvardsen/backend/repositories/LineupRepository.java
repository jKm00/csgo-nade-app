package no.edvardsen.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.Lineup;

public interface LineupRepository extends JpaRepository<Lineup, Long> {
  Optional<Lineup> findByNameIgnoreCase(String name);
}
