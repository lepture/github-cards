
function githubCard() {
  var d = document, timer;
  var input = d.getElementById('howto-input');

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
    var iframe = githubCard.render(card, 'card.html');

    iframe.onload = function() {
      var textarea = d.getElementById('howto-code');
      card.setAttribute('data-width', iframe.width);
      card.setAttribute('data-height', iframe.height);
      var html = card.outerHTML;
      html += '\n<script src="http://lab.lepture.com/github-cards/widget.js"></script>';
      textarea.value = html;
      if (location.hash.slice(1) !== value) {
        location.hash = '#' + value;
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

  input.onkeydown = function() {
    clearTimeout(timer);
  };

  if (location.hash) {
    window.onload = function() {
      input.value = location.hash.slice(1);
      preview(input.value);
    };
  }
}

githubCard();
