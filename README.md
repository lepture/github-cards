# unofficial GitHub Cards

Card for your GitHub profile, card for your GitHub repositories.


## Usage

The cards are hosted via GitHub Pages. You can embed it with iframes.

Example of user card:

```html
<iframe src="http://lab.lepture.com/github-cards/card.html?user=USERNAME" frameborder="0" scrolling="0" width="400" height="200" allowtransparency></iframe>
```

Example of repo card:

```html
<iframe src="http://lab.lepture.com/github-cards/card.html?user=USERNAME&repo=REPOSITORY" frameborder="0" scrolling="0" width="400" height="200" allowtransparency></iframe>
```

### Parameters

The iframe accepts two parameters: `user` and `repo`.

If `repo` is in the querystring, it will be a repo card, otherwise it is
a user card.

Currently, you need to find the perfect width and height yourself.

## Limitation

There are some limitations for github cards.

1. GitHub API rate limitation
2. SSL sites need to host its own cards
