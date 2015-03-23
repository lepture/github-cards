generate:
	@mkdir -p cards
	@./generate.py

jsdelivr:
	@cp -r cards jsdelivr

site: generate
	@rm -fr _site
	@mkdir -p _site
	@uglifyjs src/widget.js -m -o _site/widget.js
	@cp index.html site.js site.css _site/
	@cp cards/default.html _site/card.html
	@mv cards _site/

publish: _site
	@ghp-import _site -p -n

build: generate jsdelivr site

.PHONY: build jsdelivr generate publish site
