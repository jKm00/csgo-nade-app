package no.edvardsen.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import no.edvardsen.backend.models.Lineup;

public interface LineupRepository extends JpaRepository<Lineup, Long> {

}
