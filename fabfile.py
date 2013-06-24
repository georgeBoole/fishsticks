
from fabric.api import run, env, local, lcd
from sh import git, apt

PROJECT_TITLE = 'Angry Miner'

env.hosts = ['michael@elendil.hawksites.com']

def bake():
	with lcd('impact/tools'):
		local('chmod a+x bake.php')
		local('./bake.sh')

def deploy():
	pass
