/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    environment {
            DOCKER_IMAGE = 'amishakabra/demo_kubernetes'
            PORT_NUMBER = '80'
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
                        sh "sudo docker login -u \$DOCKER_USERNAME -p \$DOCKER_PASSWORD"
                    }
                }
            }
        }
        stage('Build') {
            steps {
                sh '''
                ls
                sudo docker build -t \$DOCKER_IMAGE .
                '''
            }
        }
        stage('Push') {
            steps {
                sh '''
                sudo docker push \$DOCKER_IMAGE
                '''
            }
        }

        stage('Chart Creation') {
            steps {
                sh '''
                sudo helm uninstall demo |true
                rm -r demo-helm | true
                helm create demo-helm
                ls
                '''
            }
        }
        stage('Chart Setup') {
            steps {
                sh '''
                sed -i "24s/^/# /" demo-helm/Chart.yaml
                sed -i '5s/replicaCount: 1/replicaCount: 2/' demo-helm/values.yaml
                sed -i "40s/type: ClusterIP/type: ${TYPE}/" demo-helm/values.yaml
                sed -i '34s/image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"/image: "{{ .Values.image.repository }}"/' demo-helm/templates/deployment.yaml
                sed -i '40,47 s/^/#/' demo-helm/templates/deployment.yaml
                sed -i '8s/^/# /' demo-helm/values.yaml
                sed -i '9i\rrepository: amishakabra/demo_kubernetes' demo-helm/values.yaml
                '''
            }
        }
        stage('Chart install'){
            steps{
                sh '''
                sudo helm install demo demo-helm
                sudo kubectl get all
                export NODE_PORT=$(sudo kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services demo-demo-helm)
                export NODE_IP=$(sudo kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
                echo http://$NODE_IP:$NODE_PORT
                '''
            }
        }
        }
    }
