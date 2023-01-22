package no.edvardsen.backend;

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

			// Maps
			CsgoMap inferno = new CsgoMap("Inferno", "/assets/images/thumbnails/inferno.webp",
					"/assets/images/maps/de_inferno.webp", false);
			CsgoMap mirage = new CsgoMap("Mirage", "/assets/images/thumbnails/mirage.webp",
					"/assets/images/maps/de_mirage.webp", true);
			CsgoMap nuke = new CsgoMap("Nuke", "/assets/images/thumbnails/nuke.webp",
					"/assets/images/maps/de_nuke.webp", false);
			CsgoMap overpass = new CsgoMap("Overpass", "/assets/images/thumbnails/overpass.webp",
					"/assets/images/maps/de_overpass.webp", false);
			CsgoMap vertigo = new CsgoMap("Vertigo", "/assets/images/thumbnails/vertigo.webp",
					"/assets/images/maps/de_vertigo.webp", false);
			CsgoMap ancient = new CsgoMap("Ancient", "/assets/images/thumbnails/ancient.webp",
					"/assets/images/maps/de_ancient.webp", false);
			CsgoMap anubis = new CsgoMap("Anubis", "/assets/images/thumbnails/anubis.webp",
					"/assets/images/maps/de_anubis.webp", false);

			// Mid nades
			Strat midNades = new Strat("Mid nades", mirage);
			// Lineups for mid nades
			Lineup topMid = new Lineup(
					"Top mid",
					"Smokes of top mid from T spawn",
					NadeType.SMOKE,
					90,
					30,
					61,
					38.5,
					"https://www.youtube.com/embed/7PKtAxC-0nE");
			Lineup window1 = new Lineup(
					"Window nade 1",
					"Nades window from top mid",
					NadeType.HE,
					66,
					35,
					38,
					42,
					"https://www.youtube.com/embed/lgj7_5weMhI");
			Lineup window2 = new Lineup(
					"Window nade 2",
					"Nades window from top mid",
					NadeType.HE,
					66,
					37,
					38,
					44,
					"https://www.youtube.com/embed/QGoP37P1S4k");
			Lineup window3 = new Lineup(
					"Window nade 3",
					"Nades window from top mid",
					NadeType.HE,
					66,
					39,
					38,
					46,
					"https://www.youtube.com/embed/T73TAxR-0no");
			// Add lineups
			midNades.addLineup(topMid);
			midNades.addLineup(window1);
			midNades.addLineup(window2);
			midNades.addLineup(window3);

			// A smokes
			Strat aSmokes = new Strat("A smokes", mirage);
			// Lineup for a smokes nades
			Lineup ct = new Lineup(
					"CT",
					"Smokes of CT on A site",
					NadeType.SMOKE,
					86.6,
					48,
					43,
					78,
					"https://www.youtube.com/embed/DbJnXweRkUY");

			Lineup stairs = new Lineup(
					"Stairs",
					"Smokes of stairs on A site",
					NadeType.SMOKE,
					85,
					55,
					52,
					62,
					"https://www.youtube.com/embed/Y9VOQG3kFS8");

			Lineup jungle = new Lineup(
					"Jungle",
					"Smokes of jungle on A site",
					NadeType.SMOKE,
					78,
					61,
					47.9,
					62,
					"https://www.youtube.com/embed/jtYcFnCjIQs");

			Lineup rampFlash = new Lineup(
					"Ramp",
					"Flashes just above ramp to not blind teammates",
					NadeType.FLASH,
					78,
					52,
					65,
					62,
					"https://www.youtube.com/embed/fqHEaLoGMqw");

			Lineup darkMolly = new Lineup(
					"Dark",
					"Molotoves dark",
					NadeType.MOLOTOV,
					73.2,
					75,
					62,
					70.5,
					"https://www.youtube.com/embed/4fPcSkHYu88");

			Lineup triple = new Lineup(
					"Back triple",
					"Molotoves behind triple on A site",
					NadeType.MOLOTOV,
					79.5,
					54.5,
					47,
					71.5,
					"https://www.youtube.com/embed/lsSXAYqjCJU");

			// Add lineups to strat
			aSmokes.addLineup(ct);
			aSmokes.addLineup(stairs);
			aSmokes.addLineup(jungle);
			aSmokes.addLineup(rampFlash);
			aSmokes.addLineup(darkMolly);
			aSmokes.addLineup(triple);

			// NIP B Execute
			Strat nip = new Strat("NIP B Execute", mirage);
			// Lineups
			Lineup leftShort = new Lineup(
					"Left short",
					"Smokes of left side of short",
					NadeType.SMOKE,
					71.5,
					17.5,
					31.5,
					26.5,
					"https://www.youtube.com/embed/jtbrgGL90D4");

			Lineup rightShort = new Lineup(
					"Right short",
					"Smokes of right side of short",
					NadeType.SMOKE,
					71.5,
					20,
					31.5,
					21.5,
					"https://www.youtube.com/embed/WVIesHW5KxI");

			Lineup bFlash = new Lineup(
					"B site flash",
					"Flashes B site from T apps",
					NadeType.FLASH,
					57,
					19.5,
					28,
					18,
					"https://www.youtube.com/embed/vpUCFEwN40I");

			Lineup bFlashRunning = new Lineup(
					"B site flash",
					"While running through apps, flashes B site from T apps",
					NadeType.FLASH,
					42,
					20,
					25,
					22,
					"https://www.youtube.com/embed/_6h2aOaLU1k");

			Lineup bench = new Lineup(
					"Molotov bench",
					"Molotoves bench on B site",
					NadeType.MOLOTOV,
					34,
					16,
					11,
					24.5,
					"https://www.youtube.com/embed/dEYgeNPlqb0");

			Lineup car = new Lineup(
					"Molotove car",
					"Molotoves car on B site",
					NadeType.MOLOTOV,
					40.5,
					16.5,
					18,
					16,
					"https://www.youtube.com/embed/zLPLZ0LWVPg");

			// Add lineups to strat
			nip.addLineup(leftShort);
			nip.addLineup(rightShort);
			nip.addLineup(bFlash);
			nip.addLineup(bFlashRunning);
			nip.addLineup(car);
			nip.addLineup(bench);

			// Save everything

			// Mid nade lineups
			this.lineupRepository.save(topMid);
			this.lineupRepository.save(window1);
			this.lineupRepository.save(window2);
			this.lineupRepository.save(window3);

			// A smokes lineups
			this.lineupRepository.save(ct);
			this.lineupRepository.save(stairs);
			this.lineupRepository.save(jungle);
			this.lineupRepository.save(rampFlash);
			this.lineupRepository.save(darkMolly);
			this.lineupRepository.save(triple);

			// NIP B Execute
			this.lineupRepository.save(leftShort);
			this.lineupRepository.save(rightShort);
			this.lineupRepository.save(bFlash);
			this.lineupRepository.save(bFlashRunning);
			this.lineupRepository.save(car);
			this.lineupRepository.save(bench);

			// Maps
			this.mapRepository.save(inferno);
			this.mapRepository.save(mirage);
			this.mapRepository.save(nuke);
			this.mapRepository.save(overpass);
			this.mapRepository.save(vertigo);
			this.mapRepository.save(ancient);
			this.mapRepository.save(anubis);

			// Strats

			// A smokes
			this.stratRepository.save(aSmokes);

			// Mid nades
			this.stratRepository.save(midNades);

			// NIP B Execute
			this.stratRepository.save(nip);

			log.info("Finished initializing the application");
		} else {
			log.info("Application already initialized. Exiting initilization...");
		}
	}
}
