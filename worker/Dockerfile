FROM node:22-bookworm

LABEL org.opencontainers.image.authors="wooshcz@gmail.com" \
    org.opencontainers.image.source=https://github.com/wooshcz/sitecheckup \
    version="1.2"

RUN apt-get update -y && apt-get upgrade -y && apt-get install --no-install-recommends -y \
    bsdmainutils chromium coreutils curl ldnsutils less net-tools openssl procps python3 python3-pip socat xxd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/worker

COPY app .

ARG testssl_version=3.0.9
RUN pip install --break-system-packages --no-cache-dir -r requirements.txt && npm install && \
    curl --silent "https://testssl.sh/testssl.sh-${testssl_version}.tar.gz" | tar -xvfz && \
    cd testssl.sh-${testssl_version} && \
    mv bin etc testssl.sh ../ && \
    cd .. && rm -rf testssl.sh-${testssl_version}*

ENTRYPOINT [ "node", "index.cjs" ]
