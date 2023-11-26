FROM alpine:edge

ENV PROJECT_PATH=/source

RUN apk update && \
    apk add gradle openjdk21

WORKDIR PROJECT_PATH

RUN gradle build

CMD ["./gradlew", "bootStart"]
