/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
        stage('pre build stage') {
            when {
                not {
                    /* groovylint-disable-next-line NestedBlockDepth */
                    expression {
                        /* groovylint-disable-next-line ExplicitCallToEqualsMethod */
                        ('SUCCESS'.equals(currentBuild.previousBuild.result)) || env.BUILD_NUMBER == '2'
                    }
                }
            }
            steps {
                /* groovylint-disable-next-line GStringExpressionWithinString */
                echo "${env.BUILD_NUMBER}"
                sh '''
                docker stop $(docker ps --filter status=running -q)
                docker rm $(docker ps -aq)
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
        stage('stop') {
            steps {
                input("Want to stop Container")
                sh '''
                docker stop $(docker ps --filter status=running -q)
                docker rm $(docker ps -aq)
                '''
            }
        }
    }
}
