# Huckleberry
The onboarding assistant that does your dirty work. Huckleberry is an intelligent service that automates the process of onboarding new customers and users. It can assist with creating project spaces, adding user accounts, setting up permissions and much more. Under the hood, Huckleberry uses NLP, RPA and ML tooling to provide a simple, interactive and powerful agent.

> @huck.l.berry onboard joel.spookey@cooldev.com as a new developer

> I'm your Huckleberry! Working on it.

# Contributing

## Pre-Requisites

 * [NVM](https://github.com/creationix/nvm/blob/master/README.md#installation-and-update) or [NVM for Windows](https://github.com/coreybutler/nvm-windows/releases/latest)
 * [Yarn](https://yarnpkg.com/lang/en/docs/install)
 * [OAO](https://github.com/guigrpa/oao) - Monorepo management tool
 * [Docker](https://hub.docker.com/search/?q=Docker%20Desktop&type=edition&offering=community) & [Docker Compose](https://docs.docker.com/compose/install/)
 * [Google Cloud SDK](https://cloud.google.com/sdk) `gcloud`. Select in the dropdown your target system (e.g. install for macos). Follow directions on the next page, but STOP at "Initialize the SDK".
 * Kubernetes CLI `kubectl`
```bash
gcloud components install kubectl
```

## Initial Setup

### Bootstrap
Installs initial dependencies.

```bash
nvm install
yarn install -W
npx oao bootstrap
```

### GCloud
Setup, authorize and configure `gcloud` & `kubectl`.

```bash
npm run ops:gcloud:setup
npm run ops:gcloud:connect
```
