FROM gcr.io/gunio-tools/huckleberry/node:10.6.3-tagui

ENV WORKDIR /var/lib/gunio
RUN mkdir -p $WORKDIR
WORKDIR ${WORKDIR}

COPY package.json package.json
RUN yarn install --production

COPY dist dist

CMD ["yarn", "run", "start:prod"]
