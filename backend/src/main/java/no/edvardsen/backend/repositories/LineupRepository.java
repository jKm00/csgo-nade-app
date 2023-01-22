package no.edvardsen.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import no.edvardsen.backend.models.Lineup;

public interface LineupRepository extends JpaRepository<Lineup, Long> {

}
