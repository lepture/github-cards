#!/usr/bin/env python

import re
import os
import json
from subprocess import Popen, PIPE

GA = '''
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', '%s', 'auto');
var t = qs.user;
if (qs.repo) t += '/' + qs.repo;
ga('send', 'pageview', {'title': t});
'''


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

    html = (
        '<!doctype html><html><body>'
        '<style type="text/css">%s</style>%s'
        '<script>%s</script>'
        '</body></html>'
    )

    css = shell(['cleancss', 'theme/%s.css' % theme])

    with open('src/card.js', 'rb') as f:
        content = f.read()
        content += GA % 'UA-21475122-2'

    js = shell(['uglifyjs', '-m'], content)

    out = html % (css, tinyhtml(template), js)
    with open('cards/%s.html' % theme, 'wb') as f:
        f.write(out)


def create_widget():
    with open('package.json') as f:
        pkg = json.load(f)

    url = '//cdn.jsdelivr.net/gh/lepture/github-cards@%s/' % pkg['version']

    with open('src/widget.js') as f:
        content = f.read()
        content = content.replace(
            'var base = "//lab.lepture.com/github-cards/";',
            'var base = "%s";' % url
        )

    js = shell(['uglifyjs', '-m'], content)
    with open('jsdelivr/widget.js', 'wb') as f:
        f.write(js)


create_widget()

if not os.path.isdir('cards'):
    os.makedirs('cards')

create_card('default')
create_card('medium')
