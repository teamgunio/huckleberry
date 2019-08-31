FROM node:10.16.3

RUN apt-get update \
  && apt-get -y install \
    php-cli \
    python \
    unzip \
    wget \
    curl \
    procps \
  && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && dpkg -i google-chrome-stable_current_amd64.deb || true \
  && apt-get install -f -y \
  && dpkg -i google-chrome-stable_current_amd64.deb \
  && rm google-chrome-stable_current_amd64.deb \
  && apt-get -y remove unzip \
  && rm -rf /var/lib/apt/lists

RUN yarn global add phantomjs-prebuilt
RUN yarn global add tagui

WORKDIR /opt/tagui

#ENTRYPOINT ["/tagui/src/tagui"]
