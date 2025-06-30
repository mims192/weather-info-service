pipeline {
    agent any

    environment {
        IMAGE_NAME = 'koushik694mper/weather-info-service'
        IMAGE_TAG = '1.0'
        KUBECONFIG = credentials('kubeconfig-credentials')
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    bat "docker build -t %IMAGE_NAME%:%IMAGE_TAG% ."
                }
            }
        }

        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        bat '''
                        echo Logging into Docker Hub
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push %IMAGE_NAME%:%IMAGE_TAG%
                        docker logout
                        '''
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withCredentials([file(credentialsId: 'kubeconfig-credentials', variable: 'KUBECONFIG')]) {
                        bat 'kubectl apply -f deployment.yaml --validate=false'
                        bat 'kubectl apply -f service.yaml --validate=false'
                    }
                }
            }
        }
    }

    post {
        always {
            echo '✅ Pipeline finished. Cleaning up if necessary.'
        }
        failure {
            echo '❌ Pipeline failed. Check logs above for errors.'
        }
    }
}
