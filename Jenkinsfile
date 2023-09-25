/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh '''
                ls
                docker build -t amishakabra/demo_kubernetes .
                '''
            }
        }
        stage('Push') {
            steps {
                sh '''
                docker run -p 7000:8081 -d amishakabra/demo_kubernetes
                docker push amishakabra/demo_kubernetes
                '''
            }
        }
        }
    }
