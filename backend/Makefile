# Makefile for releasing quality-backend
#
# The release version is controlled from pkg/version

GIT_COMMIT:=$(shell git describe --dirty --always)
VERSION:=$(shell grep 'VERSION' pkg/version/version.go | awk '{ print $$4 }' | tr -d '"')
EXTRA_RUN_ARGS?=

.PHONY: test
test:
	go test ./... -coverprofile cover.out

build:
	GIT_COMMIT=$$(git rev-list -1 HEAD) && CGO_ENABLED=0 go build  -ldflags "-s -w -X github.com/flacatus/qe-dashboard-backend/pkg/version.REVISION=$(GIT_COMMIT)" -a -o ./bin/qe-dashboard-backend ./cmd/qe-dashboard-backend/*

fmt:
	gofmt -l -s -w ./
	goimports -l -w ./

swagger:
	go get github.com/swaggo/swag/cmd/swag
	cd pkg/api && $$(go env GOPATH)/bin/swag init -g server.go
