FROM node:10

ENV WORKDIR /var/lib/gunio
RUN mkdir -p $WORKDIR
WORKDIR ${WORKDIR}

COPY dist dist
COPY package.json package.json

RUN yarn install

CMD ["yarn", "run", "start:prod"]
