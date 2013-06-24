
from fabric.api import run, env, local, lcd

PROJECT_TITLE = 'Angry Miner'

env.hosts = ['michael@elendil.hawksites.com']

def install_deps():
	dependencies = {
		'apt-get -y install':[
			'php5-cli',
			'python-dev',
			'python-virtualenv'
		],
		'pip install':[
			'Jinja2'
		]
	}
	for installer, packages in dependencies:
		for pkg in packages:
			local('%s %s' % (installer, pkg))
	


def bake():
	with lcd('impact/tools'):
		local('chmod a+x bake.php')
		local('./bake.sh')

def deploy():
	pass
