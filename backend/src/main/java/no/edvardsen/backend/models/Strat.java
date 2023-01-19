package no.edvardsen.backend.models;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a strat performed at a round in csgo
 * 
 * @author Joakim
 */
@AllArgsConstructor
@Data
public class Strat {

    private final Long id;
    private final String name;
    private final List<Lineup> lineups = new ArrayList<>();
    private final CsgoMap map;

    public Strat(Long id, String name, List<Lineup> lineups, CsgoMap map) {
        this.id = id;
        this.name = name;
        this.map = map;

        this.lineups.addAll(lineups);
    }

}
