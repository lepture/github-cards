#!/usr/bin/env python

import re
import sys
from subprocess import Popen, PIPE


def tinyhtml(text):
    lines = re.split('(<[^>]+>)', text)
    rv = []
    for line in lines:
        line = line.strip()
        rv.append(line)
    return ''.join(rv)


def shell(cmd, data=None):
    p = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    stdout, stderr = p.communicate(input=data)
    if not stdout:
        raise RuntimeError(stderr)
    return stdout


def create_card(theme):
    with open('theme/%s.html' % theme) as f:
        template = f.read()

    gaq = (
        'var _gaq=_gaq||[];'
        "_gaq.push(['_setAccount','%s']);"
        "_gaq.push(['_trackPageview']);"
        '(function(d){var g=d.createElement("script");'
        'g.async=true;g.src="https://ssl.google-analytics.com/ga.js";'
        'var s=d.getElementsByTagName("script")[0];'
        's.parentNode.insertBefore(g, s);'
        '})(document);'
    )

    html = (
        '<!doctype html><html><body>'
        '<style type="text/css">%s</style>%s'
        '<script>%s</script>'
        '</body></html>'
    )

    css = shell(['cleancss', 'theme/%s.css' % theme])

    scripts = [
        shell(['uglifyjs', 'src/card.js', '-m']),
        gaq % 'UA-21475122-2',
    ]

    out = html % (css, tinyhtml(template), ''.join(scripts))
    sys.stdout.write(out)


def create_widget(url):
    with open('src/widget.js') as f:
        content = f.read()
        content = content.replace(
            'var base = "http://lab.lepture.com/github-cards/";',
            'var base = "%s";' % url
        )

    js = shell(['uglifyjs', '-m'], content)
    sys.stdout.write(js)


if len(sys.argv) == 2:
    theme = sys.argv[1]
    if '//' in theme:
        create_widget(theme)
    else:
        create_card(theme)
