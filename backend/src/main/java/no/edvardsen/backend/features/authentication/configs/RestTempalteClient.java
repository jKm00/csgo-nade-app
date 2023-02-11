package no.edvardsen.backend.features.authentication.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTempalteClient {

  @Bean
  RestTemplate restTemplate() {
    return new RestTemplate();
  }

}
