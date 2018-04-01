#!/bin/bash

REPOSITORY=663601278082.dkr.ecr.ap-northeast-1.amazonaws.com/message-board/develop

TAG=1.1.0
REGION=ap-northeast-1
DOCKERFILE_PATH=provision/docker/Dockerfile

aws ecr get-login --no-include-email --region ap-northeast-1 | sh
docker push ${REPOSITORY}:${TAG}
docker push ${REPOSITORY}:latest