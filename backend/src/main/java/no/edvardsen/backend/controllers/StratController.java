package no.edvardsen.backend.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.DummyData;
import no.edvardsen.backend.models.Strat;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/strats")
public class StratController {

    private final DummyData dummyData;

    @GetMapping
    public ResponseEntity<String> initialize() {
        this.dummyData.initialize();

        return ResponseEntity.ok("Initialize complete");
    }

    @GetMapping("/{mapName}")
    public ResponseEntity<List<Strat>> getAllStratsForMap(@PathVariable(value = "mapName") String mapName) {
        return ResponseEntity.ok(this.dummyData.getStratsForMap(mapName));
    }

}
