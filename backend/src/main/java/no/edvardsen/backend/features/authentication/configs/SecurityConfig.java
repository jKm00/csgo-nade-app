package no.edvardsen.backend.features.authentication.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

import no.edvardsen.backend.features.authentication.lib.KeycloakLogoutHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

  private final KeycloakLogoutHandler keycloakLogoutHandler;

  SecurityConfig(KeycloakLogoutHandler keycloackLogoutHandler) {
    this.keycloakLogoutHandler = keycloackLogoutHandler;
  }

  @Bean
  protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
    return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf().disable()
        .authorizeHttpRequests()
        .requestMatchers("/test*").hasRole("USER")
        .anyRequest().permitAll();
    http.oauth2Login()
        .and()
        .logout()
        .addLogoutHandler(keycloakLogoutHandler)
        .logoutSuccessUrl("/");
    http.oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
    return http.build();
  }

}
