package no.edvardsen.backend.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a map that can be played in csgo
 * 
 * @author Joakim
 */
@Data
@AllArgsConstructor
@Entity
@Table(name = CsgoMap.TABLE_NAME)
public class CsgoMap {

    public static final String TABLE_NAME = "csgo_map";
    public static final String PRIMARY_KEY = "csgo_map_id";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = CsgoMap.PRIMARY_KEY)
    private Long id;

    @Column(name = "map_name")
    private String name;

    @OneToMany(mappedBy = "map")
    private List<Strat> strats = new ArrayList<>();

    public CsgoMap() {
    }

    public CsgoMap(String name) {
        this.name = name;
    }

    public void addStrat(Strat strat) {
        this.strats.add(strat);
    }
}
