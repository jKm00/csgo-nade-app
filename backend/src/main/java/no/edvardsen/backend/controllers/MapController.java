package no.edvardsen.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.services.CsgoMapService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/maps")
public class MapController {

  private final CsgoMapService mapService;

  @GetMapping("/{mapName}")
  public ResponseEntity<CsgoMap> findMapByName(@PathVariable(value = "mapName") String mapName) {
    ResponseEntity<CsgoMap> response;
    try {
      response = new ResponseEntity<>(this.mapService.findMapByName(mapName), HttpStatus.OK);
    } catch (EntityNotFoundException e) {
      response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
    return response;
  }

}
