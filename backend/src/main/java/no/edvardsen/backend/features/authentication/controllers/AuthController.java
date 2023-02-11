package no.edvardsen.backend.features.authentication.controllers;

import no.edvardsen.backend.features.authentication.dtos.LoginRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController("/api/auth")
public class AuthController {

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequest credentials) {
    // TODO: implement...
    // Reference: https://www.youtube.com/watch?v=YhYJYpSHTjA&ab_channel=CodeTech

    // Send POST request to
    // http://localhost:8080/realsm/CsgoNAde/protocol/openid-connect/token
    // with body:

    // client_id: login-app
    // username: credentials.getUsername()
    // password: credentials.getPassword()
    // grant_type: password

    // if correct credentials
    // return token
    // else
    // return bad request or something

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
