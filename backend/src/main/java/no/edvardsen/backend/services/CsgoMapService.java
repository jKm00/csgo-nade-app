package no.edvardsen.backend.services;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.repositories.CsgoMapRepository;

@Service
@RequiredArgsConstructor
public class CsgoMapService {

  private final CsgoMapRepository repository;

  public CsgoMap findMapByName(String name) throws EntityNotFoundException {
    CsgoMap map = this.repository.findByNameIgnoreCase(name);

    if (map == null) {
      throw new EntityNotFoundException("Csgo map with name " + name + " was not found");
    }

    return map;
  }

}
