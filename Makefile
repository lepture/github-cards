cards:
	@mkdir -p cards
	@./generate.py default > cards/default.html
	@./generate.py medium > cards/medium.html

widget:
	@uglifyjs src/widget.js -m -o widget.js


site: cards widget
	@rm -fr _site
	@mkdir -p _site
	@mv widget.js _site/
	@cp index.html site.js site.css _site/
	@cp cards/default.html _site/card.html
	@mv cards _site/

publish: _site
	@ghp-import _site -p -n

build: cards widget

.PHONY: cards widget build
