/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
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
