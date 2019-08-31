# Build

```bash
docker build -t gcr.io/gunio-tools/huckleberry/node:10.16.3-tagui .
```

# Run

```bash
mkdir flows
docker run -it --rm \
  --privileged \
  --shm-size 256m \
  -v "$PWD/flows":/flows \
  gcr.io/gunio-tools/huckleberry/node:10.16.3-tagui bash
```
