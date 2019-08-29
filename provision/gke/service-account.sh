export NODE_SA_NAME=kubernetes-engine-node-sa
gcloud iam service-accounts create $NODE_SA_NAME \
  --display-name "GKE Node Service Account"
export NODE_SA_EMAIL=`gcloud iam service-accounts list --format='value(email)' \
  --filter='displayName:Node Service Account'`

export PROJECT=`gcloud config get-value project`
gcloud projects add-iam-policy-binding $PROJECT \
  --member serviceAccount:$NODE_SA_EMAIL \
  --role roles/monitoring.metricWriter
gcloud projects add-iam-policy-binding $PROJECT \
  --member serviceAccount:$NODE_SA_EMAIL \
  --role roles/monitoring.viewer
gcloud projects add-iam-policy-binding $PROJECT \
  --member serviceAccount:$NODE_SA_EMAIL \
  --role roles/logging.logWriter
