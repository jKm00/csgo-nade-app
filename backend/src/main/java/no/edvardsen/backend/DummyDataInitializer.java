package no.edvardsen.backend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Lineup;
import no.edvardsen.backend.models.NadeType;
import no.edvardsen.backend.models.Strat;
import no.edvardsen.backend.repositories.CsgoMapRepository;
import no.edvardsen.backend.repositories.LineupRepository;
import no.edvardsen.backend.repositories.StratRepository;

@Component
@RequiredArgsConstructor
@Slf4j
public class DummyDataInitializer implements ApplicationListener<ApplicationReadyEvent> {

  private final CsgoMapRepository mapRepository;
  private final LineupRepository lineupRepository;
  private final StratRepository stratRepository;

  @Override
  public void onApplicationEvent(ApplicationReadyEvent event) {

    log.info("Initializing application");

    if (this.lineupRepository.count() == 0) {

      Lineup ct = new Lineup(
          "CT",
          "Smokes of CT on A site",
          NadeType.SMOKE,
          400,
          300,
          200,
          400,
          "mirage_ct_smoke.mp4");

      Lineup stairs = new Lineup(
          "Stairs",
          "Smokes of stairs on A site",
          NadeType.SMOKE,
          420,
          320,
          250,
          340,
          "mirage_stairs_smoke.mp4");

      Lineup jungle = new Lineup(
          "Jungle",
          "Smokes of jungle on A site",
          NadeType.SMOKE,
          380,
          340,
          210,
          340,
          "mirage_jungle_smoke.mp4");

      CsgoMap mirage = new CsgoMap("Mirage");

      Strat aSmokes = new Strat("A smokes", mirage);

      aSmokes.addLineup(ct);
      aSmokes.addLineup(stairs);
      aSmokes.addLineup(jungle);

      this.lineupRepository.save(ct);
      this.lineupRepository.save(stairs);
      this.lineupRepository.save(jungle);

      this.mapRepository.save(mirage);
      this.stratRepository.save(aSmokes);

      log.info("Finished initializing the application");
    } else {
      log.info("Application already initialized. Exiting initilization...");
    }
  }
}
