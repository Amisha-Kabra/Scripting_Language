/* groovylint-disable LineLength, NglParseError */
/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent {
        label 'slave-node' // Replace 'my-label' with the label of the Jenkins node you want to use.
    } 
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
                sed -i "24s/^/# /" \$HELM_PACKAGE/Chart.yaml
                sed -i "5s/replicaCount: 1/replicaCount: ${REPLICA_COUNT}/" \$HELM_PACKAGE/values.yaml
                sed -i "40s/type: ClusterIP/type: ${TYPE}/" \$HELM_PACKAGE/values.yaml
                sed -i '34s/image: "{{ .Values.image.repository }}:{{ .Values.image.tag | default .Chart.AppVersion }}"/image: "{{ .Values.image.repository }}"/' \$HELM_PACKAGE/templates/deployment.yaml
                sed -i '40,47 s/^/#/' \$HELM_PACKAGE/templates/deployment.yaml
                sed -i "12i\r      nodePort: {{  .Values.service.nodePort }}" \$HELM_PACKAGE/templates/service.yaml
                sed -i "42i\r  nodePort: 30070" \$HELM_PACKAGE/values.yaml
                sed -i '8s/^/# /' \$HELM_PACKAGE/values.yaml
                sed -i "9i\r  repository: ${DOCKER_IMAGE}" \$HELM_PACKAGE/values.yaml
                cat \$HELM_PACKAGE/values.yaml
                '''
            }
        }
        stage('Chart install') {
            steps {
                sh '''
                sudo helm install \$HELM_RELEASE \$HELM_PACKAGE
                sleep 10
                export NODE_PORT=$(sudo kubectl get --namespace default -o jsonpath="{.spec.ports[0].nodePort}" services demo-demo-helm)
                export NODE_IP=$(sudo kubectl get nodes --namespace default -o jsonpath="{.items[0].status.addresses[0].address}")
                echo http://$NODE_IP:$NODE_PORT
                '''
            }
        }
    }
}
