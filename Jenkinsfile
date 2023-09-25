/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
                docker build -t amishakabra/demo_kubernetes .
                '''
            }
        }
        stage('Push') {
            steps {
                sh '''
                docker push amishakabra/demo_kubernetes
                '''
            }
        }
        }
    }
