FROM eclipse-temurin:17-jdk-jammy

WORKDIR /app
COPY ./target/backend-0.0.1-SNAPSHOT.jar /app

EXPOSE 8080

ENTRYPOINT ["java","-jar","backend-0.0.1-SNAPSHOT.jar"]