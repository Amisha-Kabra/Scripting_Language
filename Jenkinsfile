/* groovylint-disable-next-line CompileStatic */
pipeline {
    agent any
    stages {
        stage('pre build stage') {
            // when {
            //     not {
            //         /* groovylint-disable-next-line NestedBlockDepth */
            //         expression {
            //             /* groovylint-disable-next-line ExplicitCallToEqualsMethod */
            //             ('SUCCESS'.equals(currentBuild.previousBuild.result)) 
            //         }
            //     }
            // }
            steps {
                /* groovylint-disable-next-line GStringExpressionWithinString */
                // script {
                    // def buildNumber = BUILD_NUMBER
                    // def status = 'SUCCESS'.equals(currentBuild.previousBuild.result)
                    // if(buildNumber != 1 && status== false ){
                    //     echo "build number is ${buildNumber} and ${status}"
                        sh '''
                docker stop $(docker ps --filter status=running -q) || true
                docker rm $(docker ps -aq) || true
                '''
                    }
                // }
                // }
                
                
            }
        stage('build') {
            steps {
                script {
                    def buildNumber = BUILD_NUMBER
def status = 'SUCCESS'.equals(currentBuild.previousBuild.result)
                    if(buildNumber != 100 ){
                        echo "build number is ${buildNumber} and ${status}"
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
