package no.edvardsen.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.dtos.CsgoMapDto;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.repositories.CsgoMapRepository;

@Service
@RequiredArgsConstructor
public class CsgoMapService {

  private final CsgoMapRepository repository;

  /**
   * Returns a list of all csgo maps stored in the repository
   * 
   * @return a list of all csgo maps
   */
  public List<CsgoMap> findAll() {
    return this.repository.findAll();
  }

  /**
   * Returns a map based on the id given
   * 
   * @param id of the map to find
   * @return optional containing the map. If no map is found, the optional is
   *         empty
   */
  public Optional<CsgoMap> findMapById(Long id) {
    return this.repository.findById(id);
  }

  /**
   * Returns a map with the given name
   * 
   * @param name of the map
   * @return a map
   * @throws EntityNotFoundException is thrown if no map is found
   */
  public CsgoMap findMapByName(String name) throws EntityNotFoundException {
    Optional<CsgoMap> map = this.repository.findByNameIgnoreCase(name);

    if (map.isEmpty()) {
      throw new EntityNotFoundException("Csgo map with name " + name + " was not found");
    }

    return map.get();
  }

  /**
   * Adds a map to the database
   * 
   * @param map to be added
   */
  public void addMap(CsgoMapDto map) {
    this.repository.save(new CsgoMap(
        map.getName(),
        map.getThumbnail(),
        map.getRadar(),
        map.isAvailable()));
  }

  /**
   * Makes a map available
   * 
   * @param name of the map to make available
   */
  public void enableMap(String name) {
    this.updateMapAvailability(name, true);
  }

  /**
   * Makes a map not available
   * 
   * @param name of the map to make not available
   */
  public void disableMap(String name) {
    this.updateMapAvailability(name, false);
  }

  /**
   * Updates the availability of a map
   * 
   * @param name      of the map to update
   * @param available if it should be available or not. {@code true} available,
   *                  {@code false} not available
   */
  private void updateMapAvailability(String name, boolean available) {
    CsgoMap map = this.findMapByName(name);
    map.setAvailable(available);

    this.repository.save(map);
  }

}
