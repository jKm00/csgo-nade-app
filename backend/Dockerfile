FROM maven:3.8.4-openjdk-17 as build

WORKDIR /app
COPY . .
RUN mvn clean package

# COPY ./target/backend-0.0.1-SNAPSHOT.jar /app

FROM eclipse-temurin:17-jdk-jammy

COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar /usr/local/lib/demo.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","/usr/local/lib/demo.jar"]