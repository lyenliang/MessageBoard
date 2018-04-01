#!/bin/bash

REPOSITORY=663601278082.dkr.ecr.ap-northeast-1.amazonaws.com/message-board/develop

TAG=1.1.0
REGION=ap-northeast-1
DOCKERFILE_PATH=provision/docker/Dockerfile

docker build -t ${REPOSITORY}:${TAG} -f ${DOCKERFILE_PATH} .
docker tag ${REPOSITORY}:${TAG} ${REPOSITORY}:latest