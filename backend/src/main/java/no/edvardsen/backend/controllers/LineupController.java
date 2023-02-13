package no.edvardsen.backend.controllers;

import java.util.List;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.dtos.LineupDto;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Lineup;
import no.edvardsen.backend.services.CsgoMapService;
import no.edvardsen.backend.services.LineupService;

@RestController
@RequestMapping("/api/lineups")
@RequiredArgsConstructor
public class LineupController {

  private final LineupService lineupService;
  private final CsgoMapService mapService;

  @GetMapping(path = "/{id}", produces = "video/mp4")
  public ResponseEntity<FileSystemResource> downloadVideo(@PathVariable(value = "id") Long id) {
    try {
      return new ResponseEntity<>(this.lineupService.findVideo(id), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @GetMapping("/{mapName}")
  public ResponseEntity<List<Lineup>> getLineupsForMap(@PathVariable(value = "mapName") String mapName) {
    ResponseEntity<List<Lineup>> response;

    try {

      CsgoMap map = this.mapService.findMapByName(mapName);
      List<Lineup> lineups = this.lineupService.findLineupsForMap(map);

      response = new ResponseEntity<>(lineups, HttpStatus.OK);

    } catch (EntityNotFoundException e) {
      response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  @PreAuthorize("hasRole('ADMIN')")
  @PostMapping()
  public ResponseEntity<String> addLineup(@RequestBody LineupDto lineupDto) {
    try {
      this.lineupService.addLineup(lineupDto.getMapId(), lineupDto.getName(), lineupDto.getDesc(), lineupDto.getNade(),
          lineupDto.getThrowCoordinateX(), lineupDto.getThrowCoordinateY(), lineupDto.getLandCoordinateX(),
          lineupDto.getLandCoordinateY(), lineupDto.getVideoPath());
    } catch (EntityNotFoundException e) {
      return ResponseEntity.badRequest()
          .body("Could not add lineup because the map with id " + lineupDto.getMapId() + " does not exist");
    } catch (EntityExistsException e) {
      return ResponseEntity.badRequest().body("Failed to add lineup because it already exist");

    }
    return ResponseEntity.ok("Lineup added");
  }

  @PostMapping(path = "/{id}", consumes = "multipart/form-data")
  public ResponseEntity<String> addVideoToLineup(@PathVariable(value = "id") Long id,
      @RequestParam MultipartFile video) {
    ResponseEntity<String> respone;

    try {
      this.lineupService.saveVideoToLineup(id, video.getBytes());
      respone = new ResponseEntity<>(HttpStatus.OK);
    } catch (Exception e) {
      respone = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return respone;
  }

}
