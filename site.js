
function githubCard() {
  var d = document, timer;
  var input = d.getElementById('howto-input');
  var select = d.getElementById('howto-select');

  function preview(value) {
    if (!value) {
      return;
    }

    var card = d.createElement('div');
    card.className = 'github-card';
    card.setAttribute('data-github', value);

    var container = d.getElementById('howto-preview');
    while (container.hasChildNodes()) {
      container.removeChild(container.lastChild);
    }

    container.appendChild(card);
    var iframe = githubCard.render(card, 'cards/' + select.value + '.html');

    iframe.onload = function() {
      var textarea = d.getElementById('howto-code');
      card.setAttribute('data-width', iframe.width);
      card.setAttribute('data-height', iframe.height);
      card.setAttribute('data-theme', select.value);
      var html = card.outerHTML;
      html += '\n<script src="//cdn.jsdelivr.net/github-cards/latest/widget.js"></script>';
      textarea.value = html;
      if (location.hash.slice(1) !== value) {
        location.hash = '#' + value + '|' + select.value;
      }
      d.documentElement.scrollTop = 630;
    };
  }

  input.onkeyup = function() {
    clearTimeout(timer);
    timer = setTimeout(function() {
      preview(input.value);
    }, 800);
  };

  select.onchange = function() {
    preview(input.value);
  };

  input.onkeydown = function() {
    clearTimeout(timer);
  };

  if (location.hash) {
    window.onload = function() {
      var bits = location.hash.slice(1).split('|');
      input.value = bits[0];
      select.value = bits[1] || 'default';
      preview(input.value);
    };
  }
}

githubCard();
