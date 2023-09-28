/* groovylint-disable LineLength, NglParseError */
/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    // {
    //     label 'slave-node' // Replace 'my-label' with the label of the Jenkins node you want to use.
    // } 
    environment {
            DOCKER_IMAGE = 'amishakabra/demo_kubernetes'
            PORT_NUMBER = '80'
            TYPE = 'NodePort'
            HELM_RELEASE = 'demo-helm-release'
            HELM_PACKAGE = 'demo-helm'
            REPLICA_COUNT = 2

    }
    stages {
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
        stage('Build') {
            steps {
                sh '''
                ls
                sudo docker images
                sudo docker build -t \$DOCKER_IMAGE:\${BUILD_NUMBER} .
                '''
            }
        }
        stage('Push') {
            steps {
                sh '''
                sudo docker push \$DOCKER_IMAGE:\${BUILD_NUMBER}
                '''
            }
        }

        stage('Chart Creation') {
            steps {
                sh '''
                sudo docker images
                sudo helm uninstall \$HELM_RELEASE |true
                rm -r \$HELM_PACKAGE | true
                helm create \$HELM_PACKAGE
                ls
                '''
            }
        }
        stage('Chart Setup') {
            steps {
                sh '''
                python3 script.py
                sed -i '43,50 s/^/#/' \$HELM_PACKAGE/templates/deployment.yaml
                sed -i '12s/^/# /' \$HELM_PACKAGE/templates/serviceaccount.yaml
                nl -b a \$HELM_PACKAGE/templates/service.yaml
                nl -b a \$HELM_PACKAGE/templates/deployment.yaml
                nl -b a \$HELM_PACKAGE/values.yaml
                nl -b a \$HELM_PACKAGE/Chart.yaml

                '''
            }
        }
        stage('Chart install') {
            steps {
                sh '''
                sudo helm install \$HELM_RELEASE \$HELM_PACKAGE
                export NODE_PORT=$(sudo kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services \$HELM_RELEASE)
                export NODE_IP=$(sudo kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
                echo http://$NODE_IP:$NODE_PORT
                '''
            }
        }
    }
}
