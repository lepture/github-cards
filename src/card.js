function querystring() {
  var href = window.location.href, kv;
  var params = href.slice(href.indexOf('?') + 1).split('&');
  var qs = [];

  for (i = 0; i < params.length; i++) {
    kv = params[i].split('=');
    qs.push(kv[0]);
    qs[kv[0]] = kv[1];
  }
  return qs;
}

var qs = querystring();

(function(d) {
  var baseurl = 'https://api.github.com/', i;

  function store(key, value) {
    try {
      if (window.localStorage) {
        if (value) {
          value._timestamp = new Date().valueOf();
          localStorage[key] = JSON.stringify(value);
        } else {
          var ret = localStorage[key];
          if (ret) {
            return JSON.parse(ret);
          }
          return null;
        }
      }
    } catch(e) {}
  }

  function valueof(data, key) {
    var ret = data;
    var bits = key.split('.');
    for (var j = 0; j < bits.length; j++) {
      if (ret) {
        ret = ret[bits[j]];
      } else {
        break;
      }
    }
    if (ret === undefined || ret === null) {
      return '';
    }
    return ret;
  }

  function template(type, data) {
    var t = d.getElementById(type + '-card');
    var regex = /{([^}]+)}/g;
    var text = t.innerHTML;
    var m = text.match(regex);
    for (i = 0; i < m.length; i++) {
      text = text.replace(m[i], valueof(data, m[i].slice(1, -1)));
    }
    return text;
  }

  function request(url, callback) {
    var cache = store(url);
    if (cache && cache._timestamp) {
      // cache in 10s
      if (new Date().valueOf() - cache._timestamp < 10000) {
        return callback(cache);
      }
    }
    if (qs.client_id && qs.client_secret) {
      url += '?client_id=' + qs.client_id + '&client_secret=' + qs.client_secret;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
      callback(JSON.parse(xhr.response));
    };
    xhr.send();
  }

  function linky(card, identity) {
    var links = card.getElementsByTagName('a');
    for (i = 0; i < links.length; i++) {
      (function(link) {
        link.target = '_' + (qs.target || 'top');
      })(links[i]);
    }
    d.body.appendChild(card);
    d.body.className = 'ready';
    if (parent !== self && parent.postMessage) {
      var height = Math.max(
        d.body.scrollHeight,
        d.documentElement.scrollHeight,
        d.body.offsetHeight,
        d.documentElement.offsetHeight,
        d.body.clientHeight,
        d.documentElement.clientHeight
      );
      parent.postMessage({
        height: height,
        sender: qs.identity || '*'
      }, '*');
    }
  }

  function userCard(user) {
    var url = baseurl + 'users/' + user;
    request(url, function(data) {
      data = data || {};
      var message = data.message;
      var defaults = '0';
      if (message) {
        data = store(url) || data;
        defaults = '?';
      } else {
        store(url, data);
      }
      data.login = user;
      data.name = escape(data.name || user);
      data.public_repos = numberic(data.public_repos) || defaults;
      data.public_gists = numberic(data.public_gists) || defaults;
      data.followers = numberic(data.followers) || defaults;

      var job = 'Not available for hire.';
      if (data.hireable) {
        var link = '';
        if (data.email) {
          link = 'mailto:' + data.email;
        } else if (data.blog) {
          link = data.blog;
        } else {
          link = data.html_url;
        }
        job = '<a href="' + link + '">Available for hire.</a>';
      }
      if (message) {
        job = message;
      }
      data.job = job;

      var card = d.createElement('div');
      card.className = 'github-card user-card';
      card.innerHTML = template('user', data);
      linky(card);
    });
  }

  function repoCard(user, repo) {
    var url = baseurl + 'repos/' + user + '/' + repo;
    request(url, function(data) {
      data = data || {};
      var message = data.message;
      var defaults = '0';
      if (message) {
        data = store(url) || data;
        defaults = '?';
      } else {
        store(url, data);
      }
      data.login = user;

      data.avatar_url = '';
      if (data.owner && data.owner.avatar_url) {
        data.avatar_url = data.owner.avatar_url;
      }
      data.forks_count = numberic(data.forks_count) || defaults;
      data.watchers_count = numberic(data.watchers_count) || defaults;
      if (data.fork) {
        data.action = 'Forked by ';
      } else {
        data.action = 'Created by ';
      }
      var description = data.description;
      if (!description && data.source) {
        description = data.source.description;
      }
      if (!description && message) {
        description = message;
      }
      data.description = escape(description) || 'No description';
      var homepage = data.homepage;
      if (!homepage && data.source) {
        homepage = data.source.homepage;
      }
      if (homepage) {
        data.homepage = ' <a href="' + homepage + '">' + homepage.replace(/https?:\/\//, '').replace(/\/$/, '') + '</a>';
      } else {
        data.homepage = '';
      }

      var card = d.createElement('div');
      card.className = 'github-card repo-card';
      card.innerHTML = template('repo', data);
      linky(card);
    });
  }

  function errorCard() {
  }

  function numberic(num) {
    if (!num) return null;
    if (num === 1000) return '1k';
    if (num < 1000) return num;
    num = num / 1000;
    if (num > 10) return parseInt(num, 10) + 'k';
    return num.toFixed(1) + 'k';
  }

  if (!qs.user) {
    errorCard();
  } else if (qs.repo) {
    repoCard(qs.user, qs.repo);
  } else {
    userCard(qs.user);
  }

  function escape(text) {
    return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

})(document);
