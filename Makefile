# Release automation for the `@aiand/sdk` npm package.
#
# Day-to-day:   make preflight              # sync + install + lint + test + build + pack
# Verify:       make verify VERSION=0.1.0   # install from npm in a clean dir and import
# Cut release:  make release VERSION=0.2.0  # bumps tag -> CI publishes via npm Trusted Publishing
#
# Manual publish (break-glass only; prefer the tag-triggered CI publish):
#   make publish   # interactive 2FA -> run in a real terminal, not a non-interactive shell
#
# Notes baked in from the 0.1.0 release:
#   - remote is `origin`
#   - npm 2FA blocks non-interactive publish; `make pack` first, then publish the prebuilt
#     tarball so the OTP isn't consumed by the prepack rebuild
#   - the verify install runs in /tmp so it loads the published package, not local ./src

VERIFY_DIR := /tmp/aiand-npm-verify
TARBALL    := aiand-sdk-$(VERSION).tgz

.PHONY: help sync install lint test build pack clean preflight verify publish tag release

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

sync: ## Fast-forward main from origin (with tags)
	git fetch origin main --tags
	git switch main
	git pull --ff-only origin main

install: ## Clean install of dependencies
	npm ci

lint: ## Type-check (tsc --noEmit)
	npm run lint

test: ## Run the test suite
	npm test

build: ## Build CJS + ESM + type declarations
	npm run build

clean: ## Remove build artifacts and packed tarballs
	rm -rf dist *.tgz

pack: build ## Produce the publishable tarball (skips prepack on publish, dodges OTP timeout)
	npm pack

preflight: sync install lint test build ## Everything safe and repeatable before a release

verify: ## Clean-room install of VERSION from npm and import it (VERSION required)
	@test -n "$(VERSION)" || { echo "VERSION is required, e.g. make verify VERSION=0.1.0"; exit 1; }
	rm -rf $(VERIFY_DIR) && mkdir -p $(VERIFY_DIR)
	cd $(VERIFY_DIR) && echo '{"name":"verify","private":true,"type":"module"}' > package.json \
		&& npm install @aiand/sdk@$(VERSION) \
		&& node -e "import('@aiand/sdk').then(m => console.log('@aiand/sdk import ok,', Object.keys(m).length, 'exports'))"

publish: pack ## Break-glass manual publish of the prebuilt tarball (interactive 2FA; real terminal)
	@test -n "$(VERSION)" || { echo "VERSION is required, e.g. make publish VERSION=0.2.0"; exit 1; }
	npm publish $(TARBALL)

tag: ## Create and push an annotated release tag (VERSION required)
	@test -n "$(VERSION)" || { echo "VERSION is required, e.g. make tag VERSION=0.2.0"; exit 1; }
	git tag -a v$(VERSION) -m "Release $(VERSION)"
	git push origin v$(VERSION)

release: preflight tag ## Run preflight, then push the tag to trigger CI publish (VERSION required)
	@echo "Pushed v$(VERSION). GitHub Actions will publish to npm via Trusted Publishing."
	@echo "After it lands: make verify VERSION=$(VERSION)"
