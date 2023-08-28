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
                        ('SUCCESS'.equals(currentBuild.previousBuild.result)) 
                    }
                }
            }.0
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
                script {
                    def buildNumber = BUILD_NUMBER

                    if(buildNumber == 4){
                        echo "build number is 4"
                    }
                }
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
                input('Want to stop Container')
                /* groovylint-disable-next-line DuplicateStringLiteral */
                sh '''
                docker stop $(docker ps --filter status=running -q)
                docker rm $(docker ps -aq)
                '''
            }
        }
    }
}
