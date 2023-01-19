package no.edvardsen.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Represents a map that can be played in csgo
 * 
 * @author Joakim
 */
@Data
@AllArgsConstructor
public class CsgoMap {
    private final Long id;
    private final String name;
}
