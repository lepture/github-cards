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

  var jsonpfunc = 'ghcard' + new Date().valueOf();

  function jsonp(url, callback) {
    window[jsonpfunc] = function(response) {
      callback(response);
    }
    var script = d.createElement('script');
    script.src = url + '?callback=' + jsonpfunc;
    d.body.appendChild(script);
  }

  function userCard(user) {
    var url = baseurl + 'users/' + user;
    var template = '<div class="header">'
      + '<a class="avatar" href="https://github.com/#username">'
      + '<img src="#avatar">'
      + '<strong>#fullname</strong>'
      + '<span>@#username</span></a>'
      + '<a class="button" href="https://github.com/#username">Follow</a>'
      + '</div>'
      + '<ul class="status">'
      + '<li><a href="https://github.com/#username?tab=repositories"><strong>#repos</strong>Repos</a></li>'
      + '<li><a href="https://gist.github.com/#username"><strong>#gists</strong>Gists</a></li>'
      + '<li><a href="https://github.com/#username/followers"><strong>#followers</strong>Followers</a></li>'
      + '</ul>'
      + '<div class="footer">#footer</a></div>'
      + '</div>';
    jsonp(url, function(response) {
      var data = response.data;
      template = template.replace(/#username/g, data.login);
      template = template.replace('#avatar', data.avatar_url);
      template = template.replace('#fullname', data.name);
      template = template.replace('#repos', data.public_repos);
      template = template.replace('#gists', data.public_gists);
      template = template.replace('#followers', data.followers);
      var footer = 'Not available for hiring.';
      if (data.hireable) {
        var url = ''
        if (data.email) {
          url = 'mailto:' + data.email;
        } else if (data.blog) {
          url = data.blog;
        } else {
          url = data.html_url;
        }
        footer = '<a href="' + url + '">Available for hiring.</a>';
      }
      template = template.replace('#footer', footer);
      var card = d.createElement('div');
      card.className = 'github-card user-card';
      card.innerHTML = template;
      d.body.appendChild(card);
    });
  }

  function repoCard(user, repo) {
  }

  function errorCard() {
  }

  var qs = querystring();
  if (!qs.user) {
    errorCard();
  } else if (qs.repo) {
    repoCard(qs.user, qs.repo);
  } else {
    userCard(qs.user);
  }

})(document);
