package no.edvardsen.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a linup. What nade you should throw, from where and where it
 * lands.
 * 
 * @author Joakim
 */
@AllArgsConstructor
@Data
public class Lineup {
    private final NadeType nade;
    private final String name;
    private final String desc;

    private final int throwCoordinateX;
    private final int throwCoordinateY;
    private final int landCoordinateX;
    private final int landCoordinateY;

    // Path to video showing how to throw the nade
    private final String videoPath;
}
