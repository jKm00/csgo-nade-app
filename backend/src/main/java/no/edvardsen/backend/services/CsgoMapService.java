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
    CsgoMap map = this.repository.findByNameIgnoreCase(name);

    if (map == null) {
      throw new EntityNotFoundException("Csgo map with name " + name + " was not found");
    }

    return map;
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

}
