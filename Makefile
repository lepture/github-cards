theme = medium

cards:
	@mkdir -p cards
	@./generate.py default > cards/default.html
	@./generate.py medium > cards/medium.html

widget:
	@uglifyjs src/widget.js -m -o widget.js

develop:
	@echo '<!doctype html><html><body>' > card.html
	@echo '<link rel="stylesheet" href="theme/${theme}.css">' >> card.html
	@cat theme/${theme}.html >> card.html
	@echo '<script src="src/card.js"></script>' >> card.html
	@echo '</body></html>' >> card.html

site: cards widget
	@rm -fr _site
	@mkdir -p _site
	@mv widget.js _site/
	@cp index.html site.js site.css _site/
	@mv cards _site/

publish: _site
	@ghp-import _site -p -n

build: cards widget

.PHONY: cards widget build
