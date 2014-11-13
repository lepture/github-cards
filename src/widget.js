(function(d) {

  var scripts = document.getElementsByTagName("script");
  var src = scripts[scripts.length-1].src;
  var base = src.replace(/\/[^\/]+\.js$/, '/');

  var i, count = 0;

  var metas = d.getElementsByTagName('meta');
  var client_url, client_id, client_secret;
  for (i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === 'gc:url') {
      client_url = metas[i].getAttribute('content');
    } else if (metas[i].getAttribute('name') === 'gc:client-id') {
      client_id = metas[i].getAttribute('content');
    } else if (metas[i].getAttribute('name') === 'gc:client-secret') {
      client_secret = metas[i].getAttribute('content');
    }
  }

  function queryclass(name) {
    if (d.querySelectorAll) {
      return d.querySelectorAll('.' + name);
    }
    var elements = d.getElementsByTagName('div');
    var ret = [];
    for (i = 0; i < elements.length; i++) {
      if (~elements[i].className.split(' ').indexOf(name)) {
        ret.push(elements[i]);
      }
    }
    return ret;
  }

  function querydata(element, name) {
    return element.getAttribute('data-' + name);
  }

  function heighty(iframe) {
    if (window.addEventListener) {
      window.addEventListener('message', function(e) {
        if (iframe.id === e.data.sender) {
          iframe.height = e.data.height;
        }
      }, false);
    }
  }

  function render(card, baseurl) {
    baseurl = baseurl || client_url;
    if (!baseurl) {
      var theme = querydata(card, 'theme') || 'default';
      baseurl = base + 'cards/' + theme + '.html';
    }
    var user = querydata(card, 'user');
    var repo = querydata(card, 'repo');
    var github = querydata(card, 'github');
    if (github) {
      github = github.split('/');
      if (github.length && !user) {
        user = github[0];
        repo = repo || github[1];
      }
    }
    if (!user) {
      return;
    }

    count += 1;
    var width = querydata(card, 'width');
    var height = querydata(card, 'height');
    var target = querydata(card, 'target');

    var key = querydata(card, 'client-id') || client_id;
    var secret = querydata(card, 'client-secret') || client_secret;

    var identity = 'ghcard-' + user + '-' + count;

    var iframe = d.createElement('iframe');
    iframe.setAttribute('id', identity);
    iframe.setAttribute('frameborder', 0);
    iframe.setAttribute('scrolling', 0);
    iframe.setAttribute('allowtransparency', true);

    var url = baseurl + '?user=' + user + '&identity=' + identity;
    if (repo) {
      url += '&repo=' + repo;
    }
    if (target) {
      url += '&target=' + target;
    }
    if (key && secret) {
      url += '&client_id=' + key + '&client_secret=' + secret;
    }
    iframe.src = url;
    iframe.width = width || Math.min(card.parentNode.clientWidth || 400, 400);
    if (height) {
      iframe.height = height;
    }
    heighty(iframe);
    card.parentNode.replaceChild(iframe, card);
    return iframe;
  }

  var cards = queryclass('github-card');
  for (i = 0; i < cards.length; i++) {
    render(cards[i]);
  }

  if (window.githubCard) {
    window.githubCard.render = render;
  }

})(document);
