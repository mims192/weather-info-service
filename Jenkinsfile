pipeline {
    agent { label 'docker-agent' }

    environment {
        COMPOSE_PROJECT_NAME = 'weather-info-service'
    }

    stages {}

        stage('Build and Run Docker Image') {
            steps {
                sh 'docker compose up --build -d'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'docker compose down'
        }
    }
}
