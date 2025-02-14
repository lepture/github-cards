# Unofficial GitHub Cards

Card for your GitHub profile, card for your GitHub repositories.

[![Donate lepture](https://img.shields.io/badge/donate-lepture-green.svg)](https://typlog.com/donate?amount=10&reason=lepture%2Fgithub-cards)

![GitHub Cards Preview](https://f.cloud.github.com/assets/290496/1350967/28069848-3716-11e3-8f87-0bef45aff1c4.png)

**New theme available**

![GitHub Cards Medium Theme](https://cloud.githubusercontent.com/assets/290496/5024776/7267e9c8-6b4a-11e4-9513-472b60b955b1.png)


## Usage

The cards are hosted via GitHub Pages.

Visit card generator: http://lab.lepture.com/github-cards/

### widget.js

You can include the `widget.js` script, it will create the embed iframes
for you.

Example of user card:

```html
<div class="github-card" data-user="lepture"></div>
<script src="https://cdn.jsdelivr.net/gh/lepture/github-cards@latest/jsdelivr/widget.js"></script>
```

Example of repo card:

```html
<div class="github-card" data-user="lepture" data-repo="github-cards"></div>
<script src="https://cdn.jsdelivr.net/gh/lepture/github-cards@latest/jsdelivr/widget.js"></script>
```

Data parameters:

- user: GitHub username
- repo: GitHub repository name
- width: Embed width you want, default is 400
- height: Embed height you want, default is 200
- theme: GitHub card theme, default is `default`
- target: If you want to open links in new tab, set it to `blank`
- client_id: Your app client_id, optional
- client_secret: Your app client_secret, optional

You can also define in meta tags:

```html
<meta name="gc:base" content="http://lab.lepture.com/github-cards/">
<meta name="gc:theme" content="medium">
<meta name="gc:client-id" content="client id string">
<meta name="gc:client-secret" content="client secret string">
```

## Limitation

There are some limitations for github cards.

1. GitHub API rate limitation
2. No interaction. You can't actually follow someone

## SSL support

GitHub Cards is available on jsdelivr now. Use widget hosted on jsdelivr:

```html
<div class="github-card" data-user="lepture" data-repo="github-cards"></div>
<script src="https://cdn.jsdelivr.net/gh/lepture/github-cards@latest/jsdelivr/widget.js"></script>
```

## Building

If you want to work on this project locally, you'll first need to clone it `git clone https://github.com/lepture/github-cards`

Then you'll need to install a few build dependencies:

* [python3](https://www.python.org/) (if not already installed, through your favorite package manager)
* [npm](https://www.npmjs.com/) (through your favorite package manager, along with Node.js)
* [uglifyjs](https://www.npmjs.com/package/uglify-js) through `sudo npm install -g uglify-js`
* [cleancss](https://www.npmjs.com/package/clean-css-cli) through `sudo npm install -g clean-css-cli`

Once all of this is installed, you should be all set to build the site ! Use `make build` to do so. You can then view the site by opening _\_site/index.html_ in your browser of choice, and start making changes (you'll need to rebuild the site every time you change the files in _src/_)

## Contribution

This project is under the BSD License.
