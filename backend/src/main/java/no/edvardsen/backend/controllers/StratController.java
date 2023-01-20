package no.edvardsen.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import no.edvardsen.backend.models.CsgoMap;
import no.edvardsen.backend.models.Strat;
import no.edvardsen.backend.services.CsgoMapService;
import no.edvardsen.backend.services.StratService;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/strats")
public class StratController {

    private final CsgoMapService mapService;
    private final StratService stratService;

    @GetMapping
    public ResponseEntity<List<Strat>> getAllStrats() {
        return new ResponseEntity<>(this.stratService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{mapName}")
    public ResponseEntity<List<Strat>> getAllStratsForMap(@PathVariable(value = "mapName") String mapName) {
        ResponseEntity<List<Strat>> response;

        try {
            CsgoMap map = this.mapService.findMapByName(mapName);
            List<Strat> strats = this.stratService.findStratsByMap(map);

            response = new ResponseEntity<>(strats, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return response;
    }

}
