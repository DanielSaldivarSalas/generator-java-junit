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

clean:
	rm -rf node_modules/ generators/ package-lock.json
	npm install
	npm run build
	cp -r src/app/templates/ generators/app/
	npm link

