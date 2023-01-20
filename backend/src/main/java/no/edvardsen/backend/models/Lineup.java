package no.edvardsen.backend.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
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
    private int throwCoordinateX;

    @Column(name = "throw_coordinate_y")
    private int throwCoordinateY;

    @Column(name = "land_coordinate_x")
    private int landCoordinateX;

    @Column(name = "land_coordinate_y")
    private int landCoordinateY;

    @Column(name = "video_path")
    private String videoPath; // Path to video showing how to throw the nade

    @JsonBackReference
    @ManyToMany(mappedBy = "lineups")
    private List<Strat> strats = new ArrayList<>();

    public Lineup() {
    }

    public Lineup(String name, String desc, NadeType nade, int throwX, int throwY, int landX, int landY,
            String videoPath) {
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
