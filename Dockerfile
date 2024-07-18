FROM openjdk:8-jdk

COPY /mango-1.0-SNAPSHOT.jar /app/mango.jar

EXPOSE 8081

CMD ["java", "-jar", "/app/mango.jar"]
