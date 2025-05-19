pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = 'weather-info-service'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/mims192/weather-info-service.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Run Application') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker-compose down'
        }
    }
}
