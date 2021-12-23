# Backend Server
Server API solution to talk with quality dashboard.

# Specifications
* Structured logging with zap.
* Use go-cache to save quality repositories in cache.
* Use swaggo to create a specific swagger for all server served endpoints
# Setup

A proper setup Go workspace using **Go 1.17+ is required**.

Install dependencies:
```
# Go to backend dir and install dependencies
$ go mod tidy
# Copy the dependencies to vendor folder
$ go mod vendor
# Create qe-dashboard-backend binary in bin folder. Please add the binary to the path or just execute ./bin/qe-dashboard-backend
$ make build
```

Environments used by the server:

| Environment Name | Value | Default | Required |
| -- | -- | -- | -- |
| `GITHUB_TOKEN` | Github token to make requests | `` | true |
| `CODECOV_TOKEN` | CodeCov token to make requests | `` | false |
