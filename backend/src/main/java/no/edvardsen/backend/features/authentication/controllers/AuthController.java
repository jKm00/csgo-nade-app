package no.edvardsen.backend.features.authentication.controllers;

import no.edvardsen.backend.features.authentication.dtos.LoginRequest;
import no.edvardsen.backend.features.authentication.dtos.LoginResponse;
import no.edvardsen.backend.features.authentication.dtos.TokenRequest;
import no.edvardsen.backend.features.authentication.services.AuthService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Exposes endpoints for authorization
 * 
 * reference: https://www.youtube.com/watch?v=YhYJYpSHTjA&ab_channel=CodeTech
 * 
 * @author Joakim
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest credentials) {
    ResponseEntity<?> response;

    try {
      LoginResponse loginResponse = this.authService.login(credentials);
      response = new ResponseEntity<>(loginResponse, HttpStatus.OK);
    } catch (HttpClientErrorException e) {
      response = new ResponseEntity<>("Wrong credentials", HttpStatus.UNAUTHORIZED);
    } catch (Exception e) {
      response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  @PostMapping("/logout")
  public ResponseEntity<String> logout(@RequestBody TokenRequest token) {
    ResponseEntity<String> response;

    try {
      String result = this.authService.logout(token);
      response = new ResponseEntity<>(result, HttpStatus.OK);
    } catch (Exception e) {
      response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    return response;
  }

  @PostMapping("/introspect")
  public ResponseEntity<String> introspect(@RequestBody TokenRequest token) {
    ResponseEntity<String> response;

    try {

      if (this.authService.introspect(token)) {
        response = new ResponseEntity<>("Valid token", HttpStatus.OK);
      } else {
        response = new ResponseEntity<>("Token has expired", HttpStatus.UNAUTHORIZED);
      }

    } catch (Exception e) {
      response = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    return response;
  }

}
