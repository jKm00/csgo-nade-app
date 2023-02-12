package no.edvardsen.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

  @GetMapping("/")
  public String version() {
    return "Csgo Nade Api: BETA v1.0";
  }

  @GetMapping("/authenticated")
  public String authenticated() {
    return "Authenticated";
  }

  @GetMapping("/admin")
  public String admin() {
    return "You have the role ADMIN";
  }

  @GetMapping("/user")
  public String user() {
    return "You have the role USER";
  }

}
