FROM node:10

ENV WORKDIR /var/lib/gunio
RUN mkdir -p $WORKDIR
WORKDIR ${WORKDIR}

RUN npm install -g serve

COPY build build
COPY serve.json build/serve.json

CMD ["serve", "-s", "build"]
