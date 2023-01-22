package no.edvardsen.backend.controllers;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.services.LineupService;

@RestController
@RequestMapping("/api/lineups")
@RequiredArgsConstructor
public class LineupController {

  private final LineupService lineupService;

  @GetMapping(path = "/{id}", produces = "video/mp4")
  public FileSystemResource downloadVideo(@PathVariable(value = "id") Long id) {
    return this.lineupService.findVideo(id);
  }

  @PostMapping(path = "/{id}", consumes = { "multipart/form-data" })
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
