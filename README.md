# unofficial GitHub Cards

Card for your GitHub profile, card for your GitHub repositories.


## Usage

The cards are hosted via GitHub Pages.

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

## Limitation

There are some limitations for github cards.

1. GitHub API rate limitation
2. SSL sites need to host its own cards
3. No interaction, it can't show your following status
