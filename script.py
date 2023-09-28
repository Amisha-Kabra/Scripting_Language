import os
HELM_RELEASE = 'demo-helm-release'
HELM_PACKAGE = 'demo-helm'
TAG = 1
PORT = 80
NODEPORT = 30070 
REPLICA_COUNT = 2
TYPE = 'NodePort'
DOCKER_IMAGE = 'amishakabra/demo_kubernetes'


my_variable = os.environ.get('DOCKER_IMAGE')
print(f'My variable: {my_variable}')


def replaceChart():
	path = 'demo.yaml'
	with open(path, 'r') as file:
		data = file.read()
		data = data.replace('appVersion: "1.16.0"', '#appVersion: "1.16.0"')
	with open(path, 'w') as file:
	    file.write(data)


def replaceValues():
	path = 'demo.yaml'
	with open(path, 'r') as file:
		data = file.read()
		data = data.replace('replicaCount: 1', f'replicaCount: {REPLICA_COUNT}')
		data = data.replace('type: ClusterIP', f'type: {TYPE}')
		data = data.replace('repository: nginx', f'repository: {DOCKER_IMAGE}')
		data = data.replace('tag: ""', f'tag: {TAG}')
		data = data.replace('port: 80',f'port: {PORT} \n  nodePort: {NODEPORT}')
	with open(path, 'w') as file:
	    file.write(data)


def replaceServiceAccount():
	path='demo.yaml'
	with open(path, 'r') as file:
		data = file.read()
		data = data.replace('automountServiceAccountToken:', '#automountServiceAccountToken:')
	
	with open(path, 'w') as file:
	    file.write(data)


def replaceService():
	path='demo.yaml'
	with open(path, 'r') as file:
		data = file.read()
		data = data.replace('targetPort: http', 'targetPort: http \n      nodePort: {{ .Values.service.nodePort }}')
	
	with open(path, 'w') as file:
	    file.write(data)

replaceChart()
replaceValues()
replaceServiceAccount()
replaceService()