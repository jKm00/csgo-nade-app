package no.edvardsen.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
  
  @GetMapping("/")
  public String version() {
    return "Csgo Nade Api: BETA v1.0";
  }

}
