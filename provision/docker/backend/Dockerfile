FROM alpine:edge

ENV PROJECT_PATH=/source

RUN apk update && \
    apk add openjdk21 gradle

VOLUME ["$PROJECT_PATH"]
WORKDIR $PROJECT_PATH

CMD gradle bootRun
