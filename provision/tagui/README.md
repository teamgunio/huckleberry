# Build

```bash
docker build -t tagui:latest .
```

# Run

```bash
mkdir flows
docker run -it --rm \
  --privileged \
  --shm-size 256m \
  -v "$PWD/flows":/flows \
  tagui bash
```
