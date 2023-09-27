pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
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