(function(d) {
  var baseurl = 'https://api.github.com/', i;

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

  function store(key, value) {
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

  var qs = querystring();

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

  var jsonpfunc = 'ghcard' + new Date().valueOf();

  function jsonp(url, callback) {
    var cache = store(url);
    if (cache && cache._timestamp) {
      // cache in 10s
      if (new Date().valueOf() - cache._timestamp < 10000) {
        return callback({data: cache});
      }
    }
    window[jsonpfunc] = function(response) {
      callback(response);
    };
    var script = d.createElement('script');
    url += '?callback=' + jsonpfunc;
    if (qs.client_id && qs.client_secret) {
      url += '&client_id=' + qs.client_id + '&client_secret=' + qs.client_secret;
    }
    script.src = url;
    script.onload = function() {
      d.body.removeChild(script);
    };
    d.body.appendChild(script);
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
    jsonp(url, function(response) {
      var data = response.data || {};
      var message = data.message;
      var defaults = '0';
      if (message) {
        data = store(url) || data;
        defaults = '?';
      } else {
        store(url, data);
      }
      data.login = user;
      data.public_repos = data.public_repos || defaults;
      data.public_gists = data.public_gists || defaults;
      data.followers = data.followers || defaults;

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
    jsonp(url, function(response) {
      var data = response.data || {};
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
      data.forks_count = data.forks_count || defaults;
      data.watchers_count = data.watchers_count || defaults;
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
      data.description = description || 'No description';
      var homepage = data.homepage;
      if (!homepage && data.source) {
        homepage = data.source.homepage;
      }
      if (homepage) {
        data.homepage = ' <a href="' + homepage + '">' + homepage.replace(/https?:\/\//, '') + '</a>';
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

  if (!qs.user) {
    errorCard();
  } else if (qs.repo) {
    repoCard(qs.user, qs.repo);
  } else {
    userCard(qs.user);
  }

})(document);
