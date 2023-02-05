package no.edvardsen.backend.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

    // Url to thumbnail
    @Column(name = "thumbnail")
    private String thumbnail;

    // Url to radar image
    @Column(name = "radar")
    private String radar;

    // Wether or not the map is available
    @Column(name = "available")
    private boolean isAvailable;

    @JsonIgnore
    @OneToMany(mappedBy = "map")
    private List<Strat> strats = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "map")
    private List<Lineup> lineups = new ArrayList<>();

    public CsgoMap() {
    }

    public CsgoMap(String name, String thumbnail, String radar, boolean isAvailable) {
        this.name = name;
        this.thumbnail = thumbnail;
        this.radar = radar;
        this.isAvailable = isAvailable;
    }

    public void addStrat(Strat strat) {
        this.strats.add(strat);
    }

    public void addLineup(Lineup lineup) {
        this.lineups.add(lineup);
    }
}
