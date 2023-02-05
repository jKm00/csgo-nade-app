package no.edvardsen.backend.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a strat performed at a round in csgo
 * 
 * @author Joakim
 */
@AllArgsConstructor
@Data
@Entity
@Table(name = Strat.TABLE_NAME)
public class Strat {

    public static final String TABLE_NAME = "strat";
    public static final String PRIMARY_KEY = "strat_id";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = Strat.PRIMARY_KEY)
    private Long id;

    @Column(name = "strat_name")
    private String name;

    @JsonManagedReference
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "strat_lineups", joinColumns = @JoinColumn(name = Strat.PRIMARY_KEY), inverseJoinColumns = @JoinColumn(name = Lineup.PRIMARY_KEY))
    private List<Lineup> lineups = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = CsgoMap.PRIMARY_KEY)
    private CsgoMap map;

    public Strat() {
    }

    public Strat(String name) {
        this.name = name;
    }

    public Strat(String name, CsgoMap map) {
        this.name = name;
        this.map = map;
    }

    /**
     * Adds a lineup to this strat
     * 
     * @param lineup the lineup to be added to the strat
     */
    public void addLineup(Lineup lineup) {
        this.lineups.add(lineup);
    }

}
