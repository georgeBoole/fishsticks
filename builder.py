#!/usr/bin/python

import os
from jinja2 import Template
import json

os.system('cd impact/tools && ./bake.sh')
os.system('rm -rf impact/index.html')
template = None
with open('impact/index_template.html', 'r') as template_file:
	template = Template(template_file.read())

config = None
with open('config.json', 'r') as config_file:
	config = json.load(config_file)

if template:
	with open('impact/index.html', 'w') as index_file:
		index_file.write(template.render(host=config[u'host'] if u'host' in config else 'localhost:8888'))

