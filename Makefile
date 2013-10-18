theme = default

card:
	@echo '<!doctype html><html><body>' > card.html
	@echo '<style type="text/css">' >> card.html
	@cleancss theme/${theme}.css >> card.html
	@echo '</style>' >> card.html
	@cat theme/${theme}.html >> card.html
	@echo '<script>' >> card.html
	@uglifyjs src/card.js >> card.html
	@echo '</script></body></html>' >> card.html

widget:
	@uglifyjs src/widget.js -o widget.js

develop:
	@echo '<!doctype html><html><body>' > card.html
	@echo '<link rel="stylesheet" href="theme/${theme}.css">' >> card.html
	@cat theme/${theme}.html >> card.html
	@echo '<script src="src/card.js"></script>' >> card.html
	@echo '</body></html>' >> card.html


build: card widget

.PHONY: card widget build
