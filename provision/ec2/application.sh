# ------------------------------------------------------------------------------
# Parameters
# ------------------------------------------------------------------------------

DOCKER_VERSION="17.05.0~ce-0~ubuntu-trusty"

AWS_REGION="ap-northeast-1"
AWS_ACCOUNT_ID="663601278082"
REPO_NAME="message-board/develop"
CONFIG_FILE="./config/{{ config_file }}"
TAG="1.0.0"
ENV="dev"


# ------------------------------------------------------------------------------
# Applications
# ------------------------------------------------------------------------------

apt-get update -y
apt-get install curl -y
apt-get install git -y
apt-get install make -y
apt-get install unzip -y

# awscli

cd /tmp
curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
unzip awscli-bundle.zip
./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws
source /etc/profile


# Install docker
# TODO: use "lsb_release -c" to retrieve "trusty" keyword

echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" > /etc/apt/sources.list.d/docker.list
apt-get update
apt-get install -y --force-yes docker-engine=${DOCKER_VERSION}

aws ecr get-login --no-include-email --region=${AWS_REGION} | sh
docker pull ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:${TAG}

cat <<EOF > /docker-compose.yml
version: "3"
services:
  api:
    image: ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${REPO_NAME}:${TAG}
    environment:
      - ENV=${ENV}
    deploy:
      replicas: 1
      restart_policy:
        condition: on-failure
    ports:
      - "80:3000"

EOF


# ------------------------------------------------------------------------------
# Start api service
# ------------------------------------------------------------------------------

docker swarm init
docker stack deploy -c /docker-compose.yml api_service
