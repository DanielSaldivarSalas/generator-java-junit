initialize:
	git init
	npm install
	npm run build
	npm link


.PHONY: ci
ci:
	npm run build
	npm test
	npm link
