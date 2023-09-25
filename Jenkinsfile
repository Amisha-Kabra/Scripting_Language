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
                docker login -u amishakabra -p amisha12345
                docker push amishakabra/demo_kubernetes
                '''
            }
        }
        }
    }
