package no.edvardsen.backend.models;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

/**
 * Represents a linup. What nade you should throw, from where and where it
 * lands.
 * 
 * @author Joakim
 */
@Data
@Entity
@Table(name = Lineup.TABLE_NAME)
public class Lineup {

    public static final String TABLE_NAME = "lineup";
    public static final String PRIMARY_KEY = "lineup_id";

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = Lineup.PRIMARY_KEY)
    private Long id;

    @Column(name = "lineup_name")
    private String name;

    @Column(name = "description")
    private String desc;

    @Column(name = "nade")
    private NadeType nade;

    @Column(name = "throw_coordinate_x")
    private double throwCoordinateX;

    @Column(name = "throw_coordinate_y")
    private double throwCoordinateY;

    @Column(name = "land_coordinate_x")
    private double landCoordinateX;

    @Column(name = "land_coordinate_y")
    private double landCoordinateY;

    @Column(name = "video_path")
    private String videoPath; // Path to video showing how to throw the nade

    @JsonBackReference
    @ManyToMany(mappedBy = "lineups")
    private List<Strat> strats = new ArrayList<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = CsgoMap.PRIMARY_KEY)
    private CsgoMap map;

    public Lineup() {
    }

    public Lineup(CsgoMap map, String name, String desc, NadeType nade, double throwX, double throwY, double landX,
            double landY,
            String videoPath) {
        this.map = map;
        this.name = name;
        this.desc = desc;
        this.nade = nade;
        this.throwCoordinateX = throwX;
        this.throwCoordinateY = throwY;
        this.landCoordinateX = landX;
        this.landCoordinateY = landY;
        this.videoPath = videoPath;
    }
}
