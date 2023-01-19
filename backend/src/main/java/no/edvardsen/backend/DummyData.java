package no.edvardsen.backend;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Lineup;
import no.edvardsen.backend.models.NadeType;
import no.edvardsen.backend.models.Strat;

@Service
public class DummyData {
	private final List<Strat> starts = new ArrayList<>();

	public List<Strat> getStratsForMap(String mapName) {
		return this.starts.stream().filter(s -> s.getMap().getName().equals(mapName)).toList();
	}

	public void initialize() {
		CsgoMap mirage = new CsgoMap(1L, "mirage");

		Lineup ct = new Lineup(
				NadeType.SMOKE,
				"CT",
				"Smokes of ct on A site",
				400,
				300,
				200,
				400,
				"ct.mp4");

		Lineup stairs = new Lineup(
				NadeType.SMOKE,
				"Stairs",
				"Smokes of stairs on A site",
				420,
				320,
				250,
				340,
				"stairs.mp4");

		Lineup jungle = new Lineup(
				NadeType.SMOKE,
				"Jungle",
				"Smokes of jungle on A site",
				380,
				340,
				210,
				340,
				"jungle.mp4");

		List<Lineup> lineups = new ArrayList<>();
		lineups.add(ct);
		lineups.add(stairs);
		lineups.add(jungle);

		Strat aSmokes = new Strat(2L, "A smokes", lineups, mirage);

		this.starts.add(aSmokes);

	}
}
