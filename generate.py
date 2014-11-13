#!/usr/bin/env python

import re
import sys
from subprocess import Popen, PIPE

if len(sys.argv) > 1:
    theme = sys.argv[1]
else:
    theme = 'default'


with open('theme/%s.html' % theme) as f:
    template = f.read()


def tinyhtml(text):
    lines = re.split('(<[^>]+>)', text)
    rv = []
    for line in lines:
        line = line.strip()
        rv.append(line)
    return ''.join(rv)


def shell(cmd):
    p = Popen(cmd, stdin=PIPE, stdout=PIPE, stderr=PIPE)
    stdout, stderr = p.communicate()
    if not stdout:
        raise RuntimeError(stderr)
    return stdout


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
