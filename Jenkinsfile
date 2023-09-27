pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Docker Login') {
            steps {
                script {
                    // Define the ID of the Docker credentials created in Jenkins
                    /* groovylint-disable-next-line NoDef, VariableTypeRequired */
                    def dockerCredentialsId = 'Docker-ID-Password'

                    // Log in to Docker Hub using the credentials
                    /* groovylint-disable-next-line LineLength, NestedBlockDepth */
                    withCredentials([usernamePassword(credentialsId: dockerCredentialsId, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh "sudo docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD"
                    }
                }
            }
        }
        stage('Build and Push Docker Image') {
            steps {
                script {
                    // Build and tag the Docker image
                    sh 'sudo docker build -t your-image-name:latest .'
                    // Push the image to a Docker registry (e.g., Docker Hub)
                    sh 'sudo docker push your-image-name:latest'
                }
            }
        }
    }
}
// jenkins ALL=(ALL) NOPASSWD:ALL 