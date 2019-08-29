export NODE_SA_NAME=kubernetes-engine-node-sa
export NODE_SA_EMAIL=`gcloud iam service-accounts list --format='value(email)' \
  --filter='displayName:Node Service Account'`

CLUSTER=${1:-tools}
ZONE=us-central1-a
REGION=us-central1-a

revision_id=`od -x /dev/urandom | head -1 | awk '{OFS="-"; print $2$3}'`

set -e

# Standard Pool
echo "Provisioning node pool: standard-pool-$revision_id"

gcloud container node-pools create standard-pool-$revision_id \
  --cluster $CLUSTER \
  --region $REGION \
  --num-nodes 3 \
  --min-nodes 3 \
  --max-nodes 8 \
  --enable-autoscaling \
  --enable-autorepair \
  --enable-autoupgrade \
  --image-type COS \
  --machine-type n1-standard-1 \
  --node-labels=workload=default \
  --service-account=$NODE_SA_EMAIL
