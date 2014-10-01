# unofficial GitHub Cards

Card for your GitHub profile, card for your GitHub repositories.

Vote it on HackerNews: https://news.ycombinator.com/item?id=6545172

![GitHub Cards Preview](https://f.cloud.github.com/assets/290496/1350967/28069848-3716-11e3-8f87-0bef45aff1c4.png)

## Usage

The cards are hosted via GitHub Pages.

Visit card generator: http://lab.lepture.com/github-cards/

### iframe

You can embed it with iframes.

Example of user card:

```html
<iframe src="http://lab.lepture.com/github-cards/card.html?user=USERNAME" frameborder="0" scrolling="0" width="400" height="200" allowtransparency></iframe>
```

Example of repo card:

```html
<iframe src="http://lab.lepture.com/github-cards/card.html?user=USERNAME&repo=REPOSITORY" frameborder="0" scrolling="0" width="400" height="200" allowtransparency></iframe>
```

The iframe accepts two parameters: `user` and `repo`.

If `repo` is in the querystring, it will be a repo card, otherwise it is
a user card.

You need to find the perfect width and height yourself.

Additional note: if you want to open links in new tab, add parameter
`target=blank`.

Additional parameters:

- target: if target=blank, links will be opened in a new tab.
- client_id: your app client_id
- client_secret: your app client_secret

client_id and client_secret can increase your API rate: http://developer.github.com/v3/#unauthenticated-rate-limited-requests

But it is not suggested to do such thing, because expose your client_secret to public is unsafe.

### widget.js

You can include the `widget.js` script, it will create the embed iframes
for you.

Example of user card:

```html
<div class="github-card" data-user="lepture"></div>
<script src="http://lab.lepture.com/github-cards/widget.js"></script>
```

Example of repo card:

```html
<div class="github-card" data-user="lepture" data-repo="github-cards"></div>
<script src="http://lab.lepture.com/github-cards/widget.js"></script>
```

Data parameters:

- user: GitHub username
- repo: GitHub repository name
- width: Embed width you want, default is 400
- height: Embed height you want, default is 200
- target: If you want to open links in new tab, set it to `blank`
- client_id: Your app client_id, optional
- client_secret: Your app client_secret, optional

You can also define in meta tags:

```html
<meta name="gc:client-id" content="client id string">
<meta name="gc:client-secret" content="client secret string">
```

## Limitation

There are some limitations for github cards.

1. GitHub API rate limitation
2. SSL sites need to host its own cards
3. No interaction, it can't show your following status

## Contribution

This project is under the BSD License.

Here are some tips on contribution:

- Don't modify card.html, it is generated with src/card.js and src/card.css.
- Don't generate card.html yourself.
- Don't change the gh-pages branch.
