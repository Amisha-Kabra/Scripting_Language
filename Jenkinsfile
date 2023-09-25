/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    environment {
            DOCKER_IMAGE = 'amishakabra/demo_kubernetes'
            PORT_NUMBER = '8081'
            TYPE = 'NodePort'
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
                        sh "docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh '''
                ls
                docker build -t \$DOCKER_IMAGE .
                '''
            }
        }
        stage('Push') {
            steps {
                sh '''
                docker push \$DOCKER_IMAGE
                '''
            }
        }
        stage('Chart Creation') {
            steps {
                sh '''
                helm create demo-helm
                ls
                '''
            }
        }
        stage('Chart Setup') {
            steps {
                sh '''
                sed -i "24s/^/# /" demo-helm/Chart.yaml
                cat demo-helm/values.yaml
                sed -i '5s/replicaCount: 1/replicaCount: 2/' demo-helm/values.yaml
                sed -i "40s/type: ClusterIP/type: ${TYPE}/" demo-helm/values.yaml
                sed -i "41s/port: 80/port: ${PORT_NUMBER}/" demo-helm/values.yaml
                sed -i '34s/image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"/image: "{{ .Values.image.repository }}"/' demo-helm/templates/deployment.yaml
                sed -i '40,47 s/^/#/' demo-helm/templates/deployment.yaml
                cat demo-helm/values.yaml
                cat demo-helm/templates/deployment.yaml
                '''
            }
        }
        stage('Chart install'){
            steps{
                sh '''
                sudo helm install demo demo-helm
                export NODE_PORT=$(kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services demo-demo-helm)
                export NODE_IP=$(kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
                echo http://$NODE_IP:$NODE_PORT
                '''
            }
        }
        }
    }
