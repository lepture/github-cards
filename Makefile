card:
	@echo '<!doctype html><html><body><style type="text/css">' > card.html
	@cleancss src/card.css >> card.html
	@echo '</style><script>' >> card.html
	@uglifyjs src/card.js >> card.html
	@echo '</script></body></html>' >> card.html

widget:
	@uglifyjs src/widget.js -o widget.js

build: card widget

.PHONY: card widget build
