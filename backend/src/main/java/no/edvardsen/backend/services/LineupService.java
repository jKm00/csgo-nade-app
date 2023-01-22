package no.edvardsen.backend.services;

import java.util.Optional;

import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.models.Lineup;
import no.edvardsen.backend.repositories.FileSystemRepository;
import no.edvardsen.backend.repositories.LineupRepository;

/**
 * Service class for lineup
 * 
 * @author Joakim
 */
@Service
@RequiredArgsConstructor
public class LineupService {

  private final LineupRepository lineupRepository;
  private final FileSystemRepository fileSystemRepository;

  /**
   * Returns the video for a lineup
   * 
   * @param id of the lineup to get video of
   * @return video as stream
   */
  public FileSystemResource findVideo(Long id) {
    Lineup lineup = this.lineupRepository.findById(id)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

    return this.fileSystemRepository.findInFileSystem(lineup.getVideoPath());
  }

  /**
   * Saves a video to a lineup
   * 
   * @param lineupId     id of the lineup
   * @param videoContent content of the video in bytes
   * @throws Exception
   */
  public void saveVideoToLineup(Long lineupId, byte[] videoContent) throws Exception {
    Optional<Lineup> _lineup = this.lineupRepository.findById(lineupId);

    Lineup lineup;
    if (_lineup.isEmpty()) {
      throw new EntityNotFoundException("No lineup found with id: " + lineupId);
    } else {
      lineup = _lineup.get();
    }

    String videoPath = this.fileSystemRepository.save(videoContent, lineup.getName() + "_" + lineup.getId() + ".mp4");

    lineup.setVideoPath(videoPath);

    this.lineupRepository.save(lineup);

  }

}
