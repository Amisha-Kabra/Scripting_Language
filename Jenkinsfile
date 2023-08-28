pipeline {
    agent slave-node
    stages {
        stage('pre build stage') {
            steps {
                sh '''
                docker stop $(docker ps --filter status=running -q) || true
                docker rm $(docker ps -aq) || true
                '''
                    }  
            }
        stage('build') {
            steps {
                sh '''
                cd TASK_1_Tomcat
                docker build -t tomcat-demo .
                '''
            }
        }
        stage('run') {
            steps {
                sh '''
                docker run -d --name tomcat-demo-container -p 7070:8080 tomcat-demo
                '''
            }
        }
        }
    }
