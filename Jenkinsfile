/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
        stage('Docker Login') {
            steps {
                script {
                    // Define the ID of the Docker credentials created in Jenkins
                    def dockerCredentialsId = 'Docker-ID-Password'

                    // Log in to Docker Hub using the credentials
                    withCredentials([usernamePassword(credentialsId: dockerCredentialsId, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD"
                    }
                }
            }
        }
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
