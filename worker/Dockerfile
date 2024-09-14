FROM node:20-bookworm

LABEL org.opencontainers.image.authors="wooshcz@gmail.com" \
    org.opencontainers.image.source=https://github.com/wooshcz/sitecheckup \
    version="1.2"

RUN apt-get update -y && apt-get upgrade -y && apt-get install --no-install-recommends -y \
    bsdmainutils chromium coreutils curl ldnsutils less net-tools openssl procps python3 python3-pip socat xxd \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/worker

COPY app .

RUN pip install --break-system-packages --no-cache-dir -r requirements.txt && npm install
ADD https://testssl.sh/testssl.sh-3.0.9.tar.gz testssl.sh-3.0.9.tar.gz
RUN tar -xvf testssl.sh-3.0.8.tar.gz && \
    cd testssl.sh-3.0.8 && \
    mv bin etc testssl.sh ../ && \
    rm -rf testssl.sh-3.0.8*

CMD [ "node", "index.cjs" ]