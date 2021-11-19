# Makefile for releasing quality-backend
#
# The release version is controlled from pkg/version

VERSION:=$(shell grep 'VERSION' pkg/version/version.go | awk '{ print $$4 }' | tr -d '"')

.PHONY: test
test:
	go test ./... -coverprofile cover.out

build:
	CGO_ENABLED=0 go build -a -o ./bin/qe-dashboard-backend ./cmd/qe-dashboard-backend/*

fmt:
	gofmt -l -s -w ./
	goimports -l -w ./

swagger:
	go get github.com/swaggo/swag/cmd/swag
	cd pkg/api && $$(go env GOPATH)/bin/swag init -g server.go
