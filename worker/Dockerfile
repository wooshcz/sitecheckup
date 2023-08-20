FROM node:18-bullseye

LABEL org.opencontainers.image.authors="wooshcz@gmail.com" \
    org.opencontainers.image.source=https://github.com/wooshcz/sitecheckup \
    version="1.1"

RUN apt-get update -y && apt-get upgrade -y && apt-get install --no-install-recommends -y \
    less ldnsutils coreutils curl socat openssl xxd net-tools bsdmainutils procps \
    chromium \
    python3 python3-pip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/worker

COPY app .

RUN pip install --no-cache-dir -r requirements.txt
RUN npm install

RUN curl "https://testssl.sh/testssl.sh-3.0.8.tar.gz" --output testssl.sh-3.0.8.tar.gz  && \
    tar -xvf testssl.sh-3.0.8.tar.gz && \
    cd testssl.sh-3.0.8 && \
    mv bin etc testssl.sh ../ && \
    rm -rf testssl.sh-3.0.8*

CMD [ "node", "index.cjs" ]