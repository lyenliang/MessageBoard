FROM ubuntu:14.04

LABEL Brian Lee <lyenliang@gmail.com>

ENV NODE_VERSION 6.10

RUN apt-get update && \
    apt-get install curl -y && \
    apt-get install git -y && \
    apt-get install make -y

# ------------------------------------------------------------------------------
# node.js 6.10
# Reference: https://github.com/mklement0/n-install
# ------------------------------------------------------------------------------

RUN cd /opt && \
    curl -L https://git.io/n-install | bash -s -- -y lts 0.10 && \
    # Install node.js and npm using n
    /root/n/bin/n ${NODE_VERSION}

COPY webapp/ webapp/
WORKDIR /webapp
RUN npm install

CMD ["/root/n/bin/node", "app.js"]