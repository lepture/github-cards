card:
	@echo '<!doctype html><html><body>' > card.html
	@echo '<style type="text/css">' >> card.html
	@cleancss src/card.css >> card.html
	@echo '</style><script>' >> card.html
	@uglifyjs src/card.js >> card.html
	@echo '</script></body></html>' >> card.html
